import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

// Fix: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
// Using a type explicitly from the imported 'React' module is safer and more consistent with other components.
const themes: { name: Theme; icon: React.ReactNode }[] = [
  {
    name: 'dark',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    ),
  },
  {
    name: 'light',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    ),
  },
  {
    name: 'synthwave',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6c3 0 3 6 6 6s3-6 6-6 3 6 6 6"/><path d="M3 12c3 0 3 6 6 6s3-6 6-6 3 6 6 6"/></svg>
    ),
  },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex items-center p-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)]">
      {themes.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            currentTheme === name
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          aria-label={`Switch to ${name} theme`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
