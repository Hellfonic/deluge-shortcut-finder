import React from 'react';
import { Shortcut } from '../types';

interface ShortcutCardProps {
  shortcut: Shortcut;
}

const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="px-2 py-1 text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-muted)] border border-[var(--color-border-secondary)] rounded-md shadow-sm font-mono">
    {children}
  </kbd>
);

const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut }) => {
  return (
    <div className="bg-[var(--color-bg-secondary)]/70 border border-[var(--color-border-primary)] rounded-xl p-5 flex flex-col h-full transition-colors duration-200 hover:border-[var(--color-accent)]/60 shadow-sm">
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {shortcut.combo.map((key, index) => {
            const isThen = key.toLowerCase() === 'then';
            const nextIsThen = index + 1 < shortcut.combo.length && shortcut.combo[index + 1].toLowerCase() === 'then';
            const showPlus = index < shortcut.combo.length - 1 && !isThen && !nextIsThen;

            return (
              <React.Fragment key={index}>
                {isThen ? (
                  <kbd className="px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-inset)] border border-[var(--color-bg-primary)] rounded-md shadow-inner font-mono italic">
                    then
                  </kbd>
                ) : (
                  <Key>{key}</Key>
                )}
                {showPlus && <span className="text-[var(--color-text-tertiary)]">+</span>}
              </React.Fragment>
            );
          })}
        </div>
        <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">{shortcut.description}</p>
        {shortcut.notes && (
          <p className="mt-2 text-xs text-[var(--color-text-secondary)] italic">{shortcut.notes}</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-[var(--color-border-primary)]">
        <span className="text-xs font-medium text-[var(--color-accent-subtle-text)] bg-[var(--color-accent-subtle-bg)] px-2 py-1 rounded-full">
          {shortcut.category}
        </span>
      </div>
    </div>
  );
};

export default ShortcutCard;
