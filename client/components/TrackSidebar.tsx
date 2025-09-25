
import React from 'react';
import { Track } from '../types/midi';

interface TrackSidebarProps {
  tracks: Track[];
  trackStates: Map<number, { muted: boolean; volume: number }>;
  onToggleMute: (trackIndex: number) => void;
  onVolumeChange: (trackIndex: number, volume: number) => void;
}

export const TrackSidebar: React.FC<TrackSidebarProps> = ({ tracks, trackStates, onToggleMute, onVolumeChange }) => {
  return (
    <aside className="w-64 bg-gray-800/50 border-r border-gray-700 p-2 overflow-y-auto flex-shrink-0">
      <h2 className="text-lg font-semibold text-gray-200 mb-3 px-2">Tracks</h2>
      <ul>
        {tracks.map((track, index) => {
          const state = trackStates.get(index) || { muted: false, volume: 0 };
          return (
            <li key={index} className="p-2 mb-1 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate flex-1 pr-2" title={track.name || `Track ${index + 1}`}>
                  {track.name || `Track ${index + 1}`}
                </span>
                <button
                  onClick={() => onToggleMute(index)}
                  className={`p-1 rounded-full text-xs ${state.muted ? 'bg-red-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}
                  title={state.muted ? 'Unmute' : 'Mute'}
                >
                  M
                </button>
              </div>
              <div className="text-xs text-gray-400 truncate" title={track.instrument.name}>{track.instrument.name}</div>
              <div className="mt-2">
                 <input
                    type="range"
                    min="-40"
                    max="6"
                    step="1"
                    value={state.volume}
                    onChange={(e) => onVolumeChange(index, parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
                    title={`Volume: ${state.volume} dB`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
