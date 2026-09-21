import React, { useState, useRef, useEffect, useCallback } from 'react';

function Projects({ isDarkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const pointerStartX = useRef(0);
  const wheelAccum = useRef(0);
  const isCoolingDown = useRef(false);
  const isTouching = useRef(false);
  const isAnimating = useRef(false);
  const cardRef = useRef(null);

  const CARD_TRANSITION_MS = 130;

  // Track viewport width so the "Area of Expertise" grid can collapse
  // from 3 columns to 1 on phones/small tablets.
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

  const cardBgColor = isDarkMode ? colors.jetBlack : '#FFFFFF';
  const sectionHeadingColor = isDarkMode ? colors.porcelain : colors.textDark;
  const unifiedTitleColor = isDarkMode ? colors.mediumJungle : colors.steelBlue;
  const bodyTextColor = isDarkMode ? '#D1DCD1' : '#6B5B53'; 
  const skillBadgeBg = isDarkMode ? colors.inkBlack : colors.teaGreen;
  const skillBadgeTextColor = isDarkMode ? colors.mediumJungle : colors.steelBlue;

  const cardContainerStyle = {
    backgroundColor: cardBgColor,
    padding: isMobile ? '1.5rem' : '2rem',
    borderRadius: '4px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: isMobile ? '200px' : '240px',
    userSelect: 'none',
    touchAction: 'pan-y',
    boxShadow: isDarkMode ? 'none' : '0 4px 14px rgba(44, 34, 30, 0.04)',
    transition: 'background-color 0.3s ease',
    boxSizing: 'border-box',
    width: '100%'
  };

  // Swipeable card: follows the mouse/finger while dragging (transition
  // disabled), and slides fully off/in on a confirmed swipe (transition
  // enabled) via the shared changeSlide() animation below.
  const swipeCardStyle = {
    ...cardContainerStyle,
    minHeight: isMobile ? '140px' : '160px',
    cursor: 'default',
    transform: `translateX(${dragOffset}px)`,
    transition: (isDragging || !enableTransition)
      ? 'none'
      : `transform ${CARD_TRANSITION_MS}ms ease, background-color 0.3s ease`
  };

  const sectionHeaderStyle = {
    fontSize: isMobile ? '2rem' : '2rem',
    color: sectionHeadingColor,
    marginBottom: isMobile ? '1.5rem' : '2rem',
    textAlign: 'center',
    fontWeight: '700',
    transition: 'color 0.3s ease',
    fontFamily: '"RockSalt"'
  };

  const unifiedTitleStyle = {
    margin: '0 0 0.8rem 0',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: unifiedTitleColor,
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontFamily: "'Average Sans', sans-serif",
    transition: 'color 0.3s ease'
  };

  const contentBodyStyle = {
    margin: '0 0 1.2rem 0',
    fontFamily: "'Average Sans', sans-serif",
    color: bodyTextColor,
    fontSize: '0.95rem',
    lineHeight: '1.5',
    transition: 'color 0.3s ease'
  };

  const skillLabelStyle = {
    fontSize: '0.9rem',
    color: unifiedTitleColor,
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    fontFamily: "'Average Sans', sans-serif",
    transition: 'color 0.3s ease'
  };

  const skillBadgeStyle = {
    background: skillBadgeBg,
    padding: '0.3rem 0.6rem',
    borderRadius: '3px',
    fontSize: '0.85rem',
    color: skillBadgeTextColor,
    fontWeight: '600',
    fontFamily: "'Average Sans', sans-serif",
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  const projectsData = [
    {
      title: "Aujla — Music Showcase (2026)",
      description: "A dark, editorial tribute site for artist Karan Aujla. Full-viewport stage layouts, bold type, and custom gold/cobalt accents carry the mood.",
      tech: ['Figma', 'HTML5', 'CSS3']
    },
    {
      title: "Gesture-Controlled Curtains",
      description: "A hands-free home automation build: wave to open, pause, or close the curtains, no touch needed. Ultrasonic sensors feed an Arduino.",
      tech: ['Arduino', 'C++', 'IoT']
    },
    {
      title: "Smart Traffic Monitoring",
      description: "A computer-vision system that watches live traffic feeds to spot violations like signal-jumping in real time and shows \"Violation Detected\" on the Screen.",
      tech: ['Arduino', 'Sensors', 'Hardware']
    }
  ];

  const minSwipeDistance = 40;    // mouse/touch drag threshold
  const wheelSwipeThreshold = 50; // trackpad wheel threshold
  const cooldownMs = 500;

  // ---------- Shared slide animation ----------
  // direction 1 = advancing to the "next" project (card exits left, next enters from right)
  // direction -1 = going to the "previous" project (card exits right, next enters from left)
  const changeSlide = useCallback((newIndex, direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const width = cardRef.current ? cardRef.current.offsetWidth : 300;

    // Phase 1: slide the current card fully off-screen in the swipe direction
    setEnableTransition(true);
    setDragOffset(direction === 1 ? -width : width);

    setTimeout(() => {
      // Phase 2: swap content, and instantly (no transition) place the
      // new card just off-screen on the opposite side
      setCurrentIndex(newIndex);
      setEnableTransition(false);
      setDragOffset(direction === 1 ? width : -width);

      // Phase 3: on the next paint, re-enable the transition and animate
      // the new card sliding in to center (offset 0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          setDragOffset(0);
          setTimeout(() => {
            isAnimating.current = false;
          }, CARD_TRANSITION_MS);
        });
      });
    }, CARD_TRANSITION_MS);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev === projectsData.length - 1 ? 0 : prev + 1;
      changeSlide(newIndex, 1);
      return prev; // actual index update happens inside changeSlide's timeout
    });
  }, [changeSlide, projectsData.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? projectsData.length - 1 : prev - 1;
      changeSlide(newIndex, -1);
      return prev;
    });
  }, [changeSlide, projectsData.length]);

  // ---------- Trackpad two-finger swipe (wheel event) ----------
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    if (isCoolingDown.current || isAnimating.current) return;
    if (isDragging) return; // don't let wheel fire mid mouse/touch-drag

    e.preventDefault();
    wheelAccum.current += e.deltaX;

    if (wheelAccum.current > wheelSwipeThreshold) {
      goNext();
      triggerCooldown();
    } else if (wheelAccum.current < -wheelSwipeThreshold) {
      goPrev();
      triggerCooldown();
    }
  };

  const triggerCooldown = () => {
    wheelAccum.current = 0;
    isCoolingDown.current = true;
    setTimeout(() => {
      isCoolingDown.current = false;
    }, cooldownMs);
  };

  // ---------- Shared drag logic (mouse + touch) ----------
  const handleMove = useCallback((clientX) => {
    setDragOffset(clientX - pointerStartX.current);
  }, []);

  const handleEnd = useCallback((clientX) => {
    const distance = pointerStartX.current - clientX; // positive = dragged left

    if (distance > minSwipeDistance) {
      setIsDragging(false);
      goNext();
    } else if (distance < -minSwipeDistance) {
      setIsDragging(false);
      goPrev();
    } else {
      // Didn't cross the threshold — snap back to center with a simple transition
      setIsDragging(false);
      setEnableTransition(true);
      setDragOffset(0);
    }
  }, [goNext, goPrev]);

  // ---------- Mouse click-and-drag (desktop, no touch) ----------
  useEffect(() => {
    if (!isDragging || isTouching.current) return;

    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = (e) => handleEnd(e.clientX);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  const handleMouseDown = (e) => {
    if (isTouching.current || isAnimating.current) return; // ignore ghost mouse events / mid-animation
    pointerStartX.current = e.clientX;
    setEnableTransition(false); // no transition while actively dragging
    setIsDragging(true);
  };

  // ---------- Touch swipe (mobile) ----------
  const handleTouchStart = (e) => {
    if (isAnimating.current) return;
    isTouching.current = true;
    pointerStartX.current = e.touches[0].clientX;
    setEnableTransition(false);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientX);
    // Release the touch lock shortly after, so it doesn't block a
    // genuinely new mouse interaction (e.g. on hybrid touch-laptops).
    setTimeout(() => {
      isTouching.current = false;
    }, 300);
  };

  // ---------- Pagination dot click ----------
  const handleDotClick = (index) => {
    if (isAnimating.current || index === currentIndex) return;
    const direction = index > currentIndex ? 1 : -1;
    changeSlide(index, direction);
  };

  return (
    <section style={{ width: '100%', padding: isMobile ? '1.5rem 1rem 3rem 1rem' : '2rem 2rem 2rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Area of Expertise Section */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '5.5rem' : '6rem', width: '100%' }}>
          <h2 style={sectionHeaderStyle}>What I Work With</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1rem' : '1.5rem',
            width: '100%'
          }}>
            
            {/* Expertise 1 */}
            <div style={cardContainerStyle}>
              <div>
                <h3 style={unifiedTitleStyle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={unifiedTitleColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <circle cx="2" cy="2" r="2"></circle>
                  </svg>
                  <span>Design & UI/UX</span>
                </h3>
                <p style={contentBodyStyle}>
                  Where every interface begins. Wireframes, component sets, and high-fidelity prototypes.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {['Figma', 'Wireframing', 'Auto-Layout', 'Design Tokens', 'Mobile-First UI'].map((skill, index) => (
                    <span key={index} style={skillBadgeStyle}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expertise 2 */}
            <div style={cardContainerStyle}>
              <div>
                <h3 style={unifiedTitleStyle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={unifiedTitleColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                    <line x1="2" y1="9" x2="22" y2="9"></line>
                    <line x1="6" y1="6" x2="8" y2="6"></line>
                  </svg>
                  <span>Frontend Engineering</span>
                </h3>
                <p style={contentBodyStyle}>
                  Turning Figma artboards into semantic, clean, maintainable web pages.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {['HTML5', 'CSS3', 'Flexbox & Grid', 'Responsive Design', 'JavaScript'].map((skill, index) => (
                    <span key={index} style={skillBadgeStyle}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expertise 3 */}
            <div style={cardContainerStyle}>
              <div>
                <h3 style={unifiedTitleStyle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={unifiedTitleColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <span>Programming & Tools</span>
                </h3>
                <p style={contentBodyStyle}>
                  Core engineering tools and computer science fundamentals that keep code organized, versioned, and easy to debug.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {['Java', 'Git', 'GitHub', 'VS Code', 'DevTools'].map((skill, index) => (
                    <span key={index} style={skillBadgeStyle}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Projects Swipeable Carousel Section */}
        <h2 style={sectionHeaderStyle}>Projects I've Worked on</h2>
        <div style={{ maxWidth: '750px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          
          {/* Active Project Card — trackpad wheel-swipe + mouse drag + touch swipe, with slide animation */}
          <div 
            ref={cardRef}
            style={swipeCardStyle}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div>
              <h3 style={unifiedTitleStyle}>{projectsData[currentIndex].title}</h3>
              <p style={contentBodyStyle}>{projectsData[currentIndex].description}</p>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {projectsData[currentIndex].tech.map((tech, index) => (
                  <span key={index} style={skillBadgeStyle}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Dots Below */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {projectsData.map((_, index) => (
                <span 
                  key={index}
                  onClick={() => handleDotClick(index)}
                  style={{
                    width: currentIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentIndex === index ? unifiedTitleColor : (isDarkMode ? '#2D3A3A' : '#E6DDD0'),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Projects;
