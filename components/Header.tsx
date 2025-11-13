import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 pt-8">
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight">
        Deluge Shortcut Finder
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
        Quickly search and filter through all Synthstrom Deluge shortcuts.
      </p>
    </header>
  );
};

export default Header;