
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 md:py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider text-yellow-200" style={{ textShadow: '0 0 10px #fde047, 0 0 20px #facc15' }}>
        Celestial Insights Tarot
      </h1>
      <p className="text-purple-300 mt-2 text-lg">Your cosmic guide to past, present, and future</p>
    </header>
  );
};

export default Header;
