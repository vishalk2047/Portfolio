import React, { useState, useEffect } from 'react';

function Header({ isDarkMode, toggleTheme }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colors = {
    inkBlack: '#040F0F',     
    mediumJungle: '#2BA84A', 
    jetBlack: '#2D3A3A',     
    porcelain: '#FCFFFC',    
    pearlBeige: '#F9F6F0',   
    textDark: '#2C221E',     
    steelBlue: '#9E6B55',    
    teaGreen: '#F0EBE1'      
  };

  const headerStyles = {
    width: '100%',
    padding: isMobile ? '0.85rem 1rem' : '1rem 1rem',
    minHeight:isMobile ? '59px' : '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    backgroundColor: isDarkMode ? colors.jetBlack : '#FFFFFF',
    borderBottom: `1px solid ${isDarkMode ? colors.inkBlack : '#E6DDD0'}`,
    boxShadow: isDarkMode ? 'none' : '0 2px 10px rgba(44, 34, 30, 0.02)'
  };

  const logoStyles = {
    margin: 0, 
    fontSize: isMobile ? '1rem' : '1.3rem', 
    fontWeight: '600',
    transition: 'color 0.3s ease',
    color: isDarkMode ? colors.porcelain : colors.textDark
  };

  const connectButtonStyles = {
    padding: isMobile ? '0.45rem 0.8rem' : '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    fontWeight: '500',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.3s ease',
    backgroundColor: isDarkMode ? colors.mediumJungle : colors.steelBlue
  };

  const iconColor = isDarkMode ? colors.mediumJungle : colors.steelBlue;

  const toggleButtonStyles = {
    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(158, 107, 85, 0.1)',
    border: 'none',
    cursor: 'pointer',
    width: isMobile ? '32px' : '38px',
    height: isMobile ? '32px' : '38px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'background-color 0.3s ease'
  };

  return (
    <header style={headerStyles}>
      <h3 style={logoStyles}>Vishal Khatri</h3>

      <div style={{ display: 'flex', gap: isMobile ? '0.6rem' : '4rem', alignItems: 'center', marginLeft: 'auto' }}>

        <button onClick={() => window.open("https://wa.me/918619392550", "_blank")} style={connectButtonStyles}>
          Let's Connect
        </button>
        <button 
          onClick={toggleTheme} 
          style={toggleButtonStyles} 
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Dark/Light Mode"
        >
          {isDarkMode ? (
            <svg width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;