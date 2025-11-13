
import React from 'react';
import { Shortcut, SortConfig, SortableKey } from '../types';

interface ShortcutTableProps {
  shortcuts: Shortcut[];
  sortConfig: SortConfig[];
  onSort: (key: SortableKey, event: React.MouseEvent) => void;
}

const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <kbd className="mr-1 px-2 py-1 text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-muted)] border border-[var(--color-border-secondary)] rounded-md shadow-sm font-mono">
        {children}
    </kbd>
);

const SortableHeader: React.FC<{
  title: string;
  sortKey: SortableKey;
  sortConfig: SortConfig[];
  onSort: (key: SortableKey, event: React.MouseEvent) => void;
}> = ({ title, sortKey, sortConfig, onSort }) => {
  const sortInfo = sortConfig.find(config => config.key === sortKey);
  const sortIndex = sortConfig.findIndex(config => config.key === sortKey);

  return (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
      <button onClick={(e) => onSort(sortKey, e)} className="flex items-center gap-2 group focus:outline-none">
        <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-150">{title}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ opacity: sortInfo ? 1 : undefined }}>
          {sortInfo?.direction === 'ascending' ? '▲' : '▼'}
          {sortConfig.length > 1 && sortIndex > -1 && <sup className="text-[10px] ml-0.5">{sortIndex + 1}</sup>}
        </span>
      </button>
    </th>
  );
};


const ShortcutTable: React.FC<ShortcutTableProps> = ({ shortcuts, sortConfig, onSort }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]/50">
      <table className="min-w-full divide-y divide-[var(--color-border-primary)]">
        <thead className="bg-[var(--color-bg-secondary)]/70">
          <tr>
            <SortableHeader title="Action" sortKey="description" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="Shortcut" sortKey="combo" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="Category" sortKey="category" sortConfig={sortConfig} onSort={onSort} />
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-primary)]">
          {shortcuts.map((shortcut) => (
            <tr key={shortcut.id} className="hover:bg-[var(--color-bg-muted)]/50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-normal text-sm text-[var(--color-text-primary)] align-top">
                {shortcut.description}
                {shortcut.notes && (
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)] italic">{shortcut.notes}</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap align-top">
                <div className="flex items-center flex-wrap gap-y-1">
                  {shortcut.combo.map((key, index) => {
                    const isThen = key.toLowerCase() === 'then';
                    const nextIsThen = index + 1 < shortcut.combo.length && shortcut.combo[index + 1].toLowerCase() === 'then';
                    const showPlus = index < shortcut.combo.length - 1 && !isThen && !nextIsThen;

                    return (
                      <React.Fragment key={index}>
                        {isThen ? (
                          <kbd className="mr-1 px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-inset)] border border-[var(--color-bg-primary)] rounded-md shadow-inner font-mono italic">
                            then
                          </kbd>
                        ) : (
                          <Key>{key}</Key>
                        )}
                        {showPlus && <span className="text-[var(--color-text-tertiary)] mx-1">+</span>}
                      </React.Fragment>
                    );
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                 <span className="text-xs font-medium text-[var(--color-accent-subtle-text)] bg-[var(--color-accent-subtle-bg)] px-2 py-1 rounded-full">
                    {shortcut.category}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutTable;
