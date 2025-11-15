import React from 'react';
import { ShortcutCategory } from '../types';

interface CategoryFilterProps {
  categories: ShortcutCategory[];
  activeCategory: ShortcutCategory | 'All';
  onSelectCategory: (category: ShortcutCategory | 'All') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const allCategories: (ShortcutCategory | 'All')[] = ['All', ...categories];

  return (
    <div className="flex w-full flex-nowrap gap-2 overflow-x-auto scrollbar-thin px-4 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
            activeCategory === category
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
              : 'bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted-hover)]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
