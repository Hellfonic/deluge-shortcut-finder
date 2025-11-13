
import React, { useState, useMemo, useEffect } from 'react';
import { ALL_SHORTCUTS, CATEGORIES } from './constants/shortcuts';
import { ShortcutCategory, Shortcut, Theme, SortConfig, SortableKey } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ShortcutTable from './components/ShortcutTable';
import { Footer } from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ShortcutCategory | 'All'>('All');
  const [sortConfig, setSortConfig] = useState<SortConfig[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('deluge-theme') as Theme;
    if (storedTheme) {
      return storedTheme;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light', 'theme-synthwave');
    body.classList.add(`theme-${theme}`);
    localStorage.setItem('deluge-theme', theme);
  }, [theme]);

  const filteredShortcuts = useMemo(() => {
    return ALL_SHORTCUTS.filter(shortcut => {
      const categoryMatch = activeCategory === 'All' || shortcut.category === activeCategory;
      const searchMatch =
        searchQuery.trim() === '' ||
        shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.combo.join(' + ').toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }, [searchQuery, activeCategory]);

  const sortedShortcuts = useMemo(() => {
    let sortableItems = [...filteredShortcuts];
    if (sortConfig.length > 0) {
      sortableItems.sort((a, b) => {
        for (const config of sortConfig) {
          const { key, direction } = config;

          const aValue = key === 'combo' ? a.combo.join(' ') : a[key];
          const bValue = key === 'combo' ? b.combo.join(' ') : b[key];
          
          let comparison = 0;
          if (aValue.toLowerCase() < bValue.toLowerCase()) {
            comparison = -1;
          } else if (aValue.toLowerCase() > bValue.toLowerCase()) {
            comparison = 1;
          }
          
          if (comparison !== 0) {
            return direction === 'ascending' ? comparison : -comparison;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredShortcuts, sortConfig]);

  const handleSort = (key: SortableKey, event: React.MouseEvent) => {
    const isShiftPressed = event.shiftKey;
    setSortConfig(prevConfig => {
      if (isShiftPressed) {
        // Multi-sort logic
        const newConfig = [...prevConfig];
        const existingIndex = newConfig.findIndex(item => item.key === key);

        if (existingIndex > -1) {
          // Key exists: cycle direction or remove
          if (newConfig[existingIndex].direction === 'ascending') {
            newConfig[existingIndex].direction = 'descending';
          } else {
            newConfig.splice(existingIndex, 1);
          }
        } else {
          // Key doesn't exist: add it
          newConfig.push({ key, direction: 'ascending' });
        }
        return newConfig;
      } else {
        // Single-sort logic
        // If the clicked column is the only one being sorted, cycle its direction
        if (prevConfig.length === 1 && prevConfig[0].key === key) {
          if (prevConfig[0].direction === 'ascending') {
            // from ascending to descending
            return [{ key, direction: 'descending' }];
          } else {
            // from descending to off
            return [];
          }
        } else {
          // Otherwise, start a new sort on this column
          return [{ key, direction: 'ascending' }];
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex flex-col">
      <div className="absolute top-4 right-4 z-20">
        <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Header />

        <div className="sticky top-0 z-10 bg-[var(--color-bg-primary)]/80 backdrop-blur-md py-6 mb-8">
            <div className="max-w-3xl mx-auto">
                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery('')}
                />
                <CategoryFilter
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />
            </div>
        </div>
        
        <div className="text-center mb-4 text-sm text-[var(--color-text-secondary)]">
          <p>Click a column header to sort. <strong>Shift-click</strong> to sort by multiple columns.</p>
        </div>

        {sortedShortcuts.length > 0 ? (
          <ShortcutTable shortcuts={sortedShortcuts} sortConfig={sortConfig} onSort={handleSort} />
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-secondary)] text-lg">No shortcuts found. Try a different search or filter.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
