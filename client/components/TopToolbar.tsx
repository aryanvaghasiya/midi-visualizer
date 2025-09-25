
import React from 'react';

interface TopToolbarProps {
  fileName: string;
  tempo: number;
  onTempoChange: (tempo: number) => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ fileName, tempo, onTempoChange }) => {
  return (
    <div className="bg-gray-900/50 p-2 flex justify-between items-center border-b border-gray-700 shadow-md flex-shrink-0">
      <div className="text-sm text-gray-400 truncate px-2">
        <span className="font-semibold text-gray-200">File:</span> {fileName}
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="tempo" className="text-sm font-medium text-gray-300">BPM</label>
        <input
          id="tempo"
          type="number"
          value={Math.round(tempo)}
          onChange={(e) => onTempoChange(parseInt(e.target.value, 10))}
          className="bg-gray-700 text-white w-20 text-center rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
};
