import React from 'react';
import Logo from '../assets/logo-celestial-insights.png'

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 md:py-8">
      <a href="/">
      <img src={Logo} style={{ width: '700px', height: 'auto' }} alt="Celestial Insights logo in blue and yellow stars in the place of the 'i' dots"></img>
      </a>
    </header>
  );
};

export default Header;
