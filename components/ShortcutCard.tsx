import React from 'react';
import { Shortcut } from '../types';

interface ShortcutCardProps {
  shortcut: Shortcut;
}

const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-md shadow-sm font-mono">
        {children}
    </kbd>
);

const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col h-full hover:border-orange-500/50 transition-colors duration-200">
      <div className="flex-grow">
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {shortcut.combo.map((key, index) => (
            <React.Fragment key={index}>
              <Key>{key}</Key>
              {index < shortcut.combo.length - 1 && <span className="text-gray-500">+</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-gray-200 text-base leading-relaxed">{shortcut.description}</p>
        {shortcut.notes && (
          <p className="mt-2 text-sm text-gray-400 italic">{shortcut.notes}</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <span className="text-xs font-medium text-orange-400 bg-orange-900/50 px-2 py-1 rounded-full">
          {shortcut.category}
        </span>
      </div>
    </div>
  );
};

export default ShortcutCard;
