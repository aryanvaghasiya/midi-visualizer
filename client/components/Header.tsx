
import React from 'react';

interface HeaderProps {
    onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="flex-shrink-0 bg-gray-800/30 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-wider">
          MIDI Player <span className="text-blue-400">/ Visualizer</span>
        </h1>
        {onReset && (
            <button 
                onClick={onReset}
                className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 transition-colors"
            >
                Load New File
            </button>
        )}
      </div>
    </header>
  );
};
