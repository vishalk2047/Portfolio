import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Your finalized dual-theme color palette tokens
  const palette = {
    // 🌙 DARK MODE COLORS (Kept exactly as they were)
    inkBlack: '#040F0F',     
    forestGreen: '#248232',  
    mediumJungle: '#2BA84A', 
    jetBlack: '#2D3A3A',     
    porcelain: '#FCFFFC',    

    // ☀️ EDITORIAL EARTHY LIGHT MODE COLORS (Inspired by your reference image)
    pearlBeige: '#F9F6F0',   // Warm Organic Cream Canvas
    textDark: '#2C221E',     // Deep Warm Espresso Text
    steelBlue: '#aa6f55',    // Terracotta / Clay Brown Accent
    teaGreen: '#F0EBE1',     // Soft Oatmeal Tag Background
    petalFrost: '#E6DDD0'    // Subtle Warm Border Tone
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? palette.inkBlack : palette.pearlBeige,
    color: isDarkMode ? palette.porcelain : palette.textDark,
    width: '100%',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  return (
    <div style={themeStyles}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} palette={palette} />
      <Hero isDarkMode={isDarkMode} palette={palette} />
      <Projects isDarkMode={isDarkMode} palette={palette} />
      <Footer isDarkMode={isDarkMode} palette={palette} />
    </div>
  );
}

export default App;