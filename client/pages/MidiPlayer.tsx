
import React from 'react';
import { ParsedMidi } from '../types/midi';
import { useMidiPlayer } from '../hooks/useMidiPlayer';
import { PianoRoll } from '../components/PianoRoll';
import { PlaybackControls } from '../components/PlaybackControls';
import { TrackSidebar } from '../components/TrackSidebar';
import { TopToolbar } from '../components/TopToolbar';

interface MidiPlayerProps {
  midiData: ParsedMidi;
  fileName: string;
}

export const MidiPlayer: React.FC<MidiPlayerProps> = ({ midiData, fileName }) => {
  const player = useMidiPlayer({ midiData });

  return (
    <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <TopToolbar fileName={fileName} tempo={player.tempo} onTempoChange={player.changeTempo} />
      <div className="flex flex-grow overflow-hidden">
        <TrackSidebar
          tracks={player.tracks}
          trackStates={player.trackStates}
          onToggleMute={player.toggleTrackMute}
          onVolumeChange={player.setTrackVolume}
        />
        <div className="flex-grow flex flex-col">
          <PianoRoll
            notes={midiData.tracks.flatMap(t => t.notes)}
            duration={player.duration}
            currentTime={player.currentTime}
            trackStates={player.trackStates}
          />
        </div>
      </div>
      <PlaybackControls
        isPlaying={player.isPlaying}
        isLooping={player.isLooping}
        onPlay={player.play}
        onPause={player.pause}
        onStop={player.stop}
        onSeek={player.seek}
        onToggleLoop={player.toggleLoop}
        currentTime={player.currentTime}
        duration={player.duration}
      />
    </div>
  );
};
