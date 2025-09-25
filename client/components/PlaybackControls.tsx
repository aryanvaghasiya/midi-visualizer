
import React, { ChangeEvent } from 'react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isLooping: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSeek: (time: number) => void;
  onToggleLoop: () => void;
  currentTime: number;
  duration: number;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying, isLooping, onPlay, onPause, onStop, onSeek, onToggleLoop, currentTime, duration
}) => {
  
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  }
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-3 flex items-center space-x-4 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <button onClick={onStop} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
          <StopIcon className="w-6 h-6" />
        </button>
        <button onClick={isPlaying ? onPause : onPlay} className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-white">
          {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
        <button onClick={onToggleLoop} className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${isLooping ? 'text-blue-400' : ''}`}>
            <LoopIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="text-sm font-mono">{formatTime(currentTime)}</div>
      
      <div className="flex-grow flex items-center">
        <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
        />
      </div>

      <div className="text-sm font-mono">{formatTime(duration)}</div>
    </div>
  );
};

// Icons
const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5v14l11-7z" /></svg>
);

const PauseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 6h12v12H6z" /></svg>
);

const LoopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183z" />
  </svg>
);
