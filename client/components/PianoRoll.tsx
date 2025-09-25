
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Note } from '../types/midi';

interface PianoRollProps {
  notes: Note[];
  duration: number;
  currentTime: number;
  trackStates: Map<number, { muted: boolean; volume: number }>;
}

const KEY_WIDTH = 60;
const OCTAVES = 7;
const TOTAL_KEYS = 12 * OCTAVES + 8; // 88 keys from A0 to C8
const WHITE_KEYS = 52;
const KEY_HEIGHT = 18;
const BLACK_KEY_HEIGHT = KEY_HEIGHT * 0.65;

const isBlackKey = (midi: number) => {
    const note = midi % 12;
    return note === 1 || note === 3 || note === 6 || note === 8 || note === 10;
};

const noteColors = [
    '#ff6b6b', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa', '#339af0',
    '#22b8cf', '#20c997', '#51cf66', '#94d82d', '#fcc419', '#ff922b'
];

export const PianoRoll: React.FC<PianoRollProps> = ({ notes, duration, currentTime, trackStates }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(50); // pixels per second
  const [scrollLeft, setScrollLeft] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const gridWidth = duration * zoom;

    // Draw background
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.fillRect(0, 0, width, height);
    
    // Draw piano keys
    let whiteKeyY = height;
    const activeKeys = new Set();
    notes.forEach(note => {
        if (currentTime >= note.time && currentTime < note.time + note.duration) {
            activeKeys.add(note.midi);
        }
    });

    for (let i = 0; i < TOTAL_KEYS; i++) {
        const midi = 21 + i; // A0 is midi 21
        if (!isBlackKey(midi)) {
            whiteKeyY -= KEY_HEIGHT;
            ctx.fillStyle = activeKeys.has(midi) ? '#3b82f6' : '#d1d5db'; // blue-500 / gray-300
            ctx.fillRect(0, whiteKeyY, KEY_WIDTH, KEY_HEIGHT);
            ctx.strokeStyle = '#1f2937';
            ctx.strokeRect(0, whiteKeyY, KEY_WIDTH, KEY_HEIGHT);
        }
    }
    
    whiteKeyY = height;
    let blackKeyOffset = KEY_HEIGHT * 0.5;
    for (let i = 0; i < TOTAL_KEYS; i++) {
        const midi = 21 + i;
        if (!isBlackKey(midi)) {
            whiteKeyY -= KEY_HEIGHT;
        } else {
            const yPos = whiteKeyY - blackKeyOffset;
            ctx.fillStyle = activeKeys.has(midi) ? '#3b82f6' : '#111827'; // blue-500 / gray-900
            ctx.fillRect(0, yPos, KEY_WIDTH * 0.6, BLACK_KEY_HEIGHT);
        }
    }

    // --- Draw grid and notes ---
    ctx.save();
    ctx.translate(KEY_WIDTH - scrollLeft, 0);

    // Draw notes
    notes.forEach(note => {
        const trackState = trackStates.get(note.track);
        if (!trackState || trackState.muted) return;

        const midi = note.midi - 21; // A0 is 21
        let y = height;
        let keysPassed = 0;
        for(let i = 0; i < midi; i++){
            if(!isBlackKey(i+21)) {
                keysPassed++;
            }
        }
        y = height - (keysPassed * KEY_HEIGHT);

        if(isBlackKey(note.midi)){
            y -= KEY_HEIGHT / 2;
        }

        const x = note.time * zoom;
        const w = note.duration * zoom;
        const h = isBlackKey(note.midi) ? BLACK_KEY_HEIGHT : KEY_HEIGHT;
        
        ctx.fillStyle = noteColors[note.midi % 12];
        ctx.globalAlpha = note.velocity * 0.8 + 0.2;
        ctx.fillRect(x, y - h, w, h - 1);
    });
    ctx.globalAlpha = 1.0;


    // Draw playhead
    const playheadX = currentTime * zoom;
    ctx.strokeStyle = '#ef4444'; // red-500
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    ctx.restore();

  }, [duration, zoom, currentTime, notes, scrollLeft, trackStates]);
  
  useEffect(() => {
    draw();
  }, [draw, currentTime]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        setZoom(prev => Math.max(10, Math.min(500, prev - e.deltaY * 0.1)));
      } else {
        setScrollLeft(prev => Math.max(0, prev + e.deltaX));
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const playheadX = currentTime * zoom;
    const visibleWidth = container.getBoundingClientRect().width - KEY_WIDTH;

    if (playheadX > scrollLeft + visibleWidth || playheadX < scrollLeft) {
      setScrollLeft(playheadX - visibleWidth / 2);
    }
  }, [currentTime, zoom, scrollLeft]);


  return (
    <div ref={containerRef} className="w-full h-full bg-gray-800 cursor-grab active:cursor-grabbing relative overflow-hidden">
      <canvas ref={canvasRef} />
    </div>
  );
};
