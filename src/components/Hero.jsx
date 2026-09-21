import React from 'react';

function Hero({ isDarkMode }) {
  // Mapping the active dual-theme palette tokens
  const colors = {
    // 🌙 Dark Mode Tokens (Kept exactly as they were)
    inkBlack: '#040F0F',     
    mediumJungle: '#2BA84A', 
    jetBlack: '#2D3A3A',     
    porcelain: '#FCFFFC',    

    // ☀️ Editorial Earthy Light Mode Tokens
    pearlBeige: '#F9F6F0',   // Warm Organic Cream Canvas
    textDark: '#2C221E',     // Deep Warm Espresso Text
    steelBlue: '#9E6B55',    // Terracotta / Clay Brown Accent
    teaGreen: '#F0EBE1'      // Soft Oatmeal Tag Background
  };

  const nameHighlightColor = isDarkMode ? colors.mediumJungle : colors.steelBlue;
  const textColor = isDarkMode ? '#D1DCD1' : '#6B5B53'; 
  
  const boxBgColor = isDarkMode ? colors.jetBlack : '#FFFFFF';
  const boxBorderColor = isDarkMode ? colors.mediumJungle : colors.steelBlue;

  const sectionStyles = {
    width: '100%',
    padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem) 2rem clamp(1rem, 4vw, 2rem)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  };

  const titleContainerStyles = {
    maxWidth: '800px',
    width: '100%',
    padding: '0.5rem 0',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  };

  // Fruktur decorative display font applied to your name
  const frukturNameStyle = {
    fontFamily: "'Fruktur', cursive",
    fontSize: 'clamp(2.2rem, 9vw, 5rem)', 
    fontWeight: '400',
    letterSpacing: '0.02em',
    color: nameHighlightColor,
    transition: 'color 0.3s ease',
    lineHeight: '1.1',
    margin: 0,
    wordBreak: 'break-word'
  };

  const briefBoxStyles = {
    maxWidth: '800px',
    width: '100%',
    padding: 'clamp(1.25rem, 4vw, 2rem)',
    borderRadius: '4px',
    backgroundColor: boxBgColor,
    boxShadow: isDarkMode ? 'none' : '0 4px 14px rgba(44, 34, 30, 0.04)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const briefTextStyles = {
    margin: 0,
    fontFamily: 'Average Sans', 
    fontSize: 'clamp(1.10rem, 2vw, 1.15rem)',
    lineHeight: '1.6',
    color: textColor,
    fontWeight: '400',
    transition: 'color 0.3s ease'
  };

  return (
    <section style={sectionStyles}>
      {/* Centered Name Signature Header using Fruktur */}
      <div style={titleContainerStyles}>
        <h1 style={frukturNameStyle}>
          Vishal Khatri
        </h1>
      </div>

      {/* Brief Box matching Figma layout blocks */}
      <div style={briefBoxStyles}>
        <p style={briefTextStyles}>
         Hi! I'm Vishal Khatri. I design interfaces and build them.<br></br>
         My design process starts in Figma, working through wireframes, Auto Layout, and components. From there, designs are converted into clean, semantic HTML and CSS that hold up across all screen sizes. 
         I know enough JavaScript to make interactions work as intended, and Java taught me to think like an engineer, not just a designer with strong opinions.<br></br>
         Lately, integrating AI into my workflow has transformed how I build. I vibe code early prototypes without losing code quality, semantics, or layout integrity. 
         Getting the exact output I need, spending less time typing code, and more time engineering the perfect user experience.
        </p>
      </div>
    </section>
  );
}

export default Hero;