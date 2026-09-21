import React, { useState, useEffect } from 'react';

function Footer({ isDarkMode }) {
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

  const footerStyles = {
    width: '100%',
    padding: isMobile ? '0.85rem 0' : '1rem 1rem',
     marginTop: isMobile ? '1.5rem' : '0', 
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1.5rem' : '0',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backgroundColor: isDarkMode ? colors.jetBlack : '#FFFFFF',
    borderTop: `1px solid ${isDarkMode ? colors.inkBlack : '#E6DDD0'}`,
    boxShadow: isDarkMode ? 'none' : '0 -2px 10px rgba(44, 34, 30, 0.02)'
  };

  const textStyles = {
    margin: 0, 
    fontSize: '1rem', 
    fontWeight: '500',
    transition: 'color 0.3s ease',
    color: isDarkMode ? colors.porcelain : colors.textDark
  };

  const linkStyles = { 
    textDecoration: 'none', 
    fontSize: '1rem', 
    fontWeight: '600',
    transition: 'color 0.3s ease',
    color: isDarkMode ? colors.mediumJungle : colors.steelBlue
  };

  return (
    <footer style={footerStyles}>
      <p style={textStyles}>
        &copy; 2026 Vishal Khatri. All Rights Reserved.
      </p>
      <div style={{ display: 'flex', gap: isMobile ? '7rem' : '2rem' }}>
        <a href="https://github.com/vishalk2047" target="_blank" rel="noopener noreferrer" style={linkStyles}>Github</a>
        <a href="https://www.linkedin.com/in/vishal-khatri-00vk2047/" target="_blank" rel="noopener noreferrer" style={linkStyles}>LinkedIn</a>
        <a href="mailto:vishalkhatri2047@gmail.com" target="_blank" rel="noopener noreferrer" style={linkStyles}>Gmail</a>    
      </div>
    </footer>
  );
}

export default Footer;