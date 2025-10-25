
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 md:py-8">
      <br />
      <br />
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider text-blue-900" style={{ textShadow: '0 0 10px #cdd3fbff, 0 0 20px #fceebbff' }}>
        Celestial Insights
      </h1>
      <p className="text-stone-600 mt-2 text-lg">Tarot</p>
    </header>
  );
};

export default Header;
