import React, { useRef, useEffect, useState } from 'react';

const ScrollComponent = ({ children }) => {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const thumbRef = useRef(null);
  let hideTimeout = useRef(null);

  const updateThumbPosition = () => {
    const container = scrollContainerRef.current;
    const thumb = thumbRef.current;
    const scrollbarHeight = window.innerHeight - 200; 
    const contentHeight = container.scrollHeight;
    const visibleHeight = container.offsetHeight;

    if (container && thumb) {
      const scrollRatio = visibleHeight / contentHeight;
      const thumbHeight = scrollbarHeight * scrollRatio; 
      const maxThumbTop = scrollbarHeight - thumbHeight;
      const scrollPosition = container.scrollTop / (contentHeight - visibleHeight);
      const thumbTop = scrollPosition * maxThumbTop;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    }
  };

  const handleScroll = () => {
    updateThumbPosition();
    showInteractiveElements();
    resetHideTimer();
  };

  const showInteractiveElements = () => {
    setIsScrollbarVisible(true);
    setAreButtonsVisible(true);
  };

  const hideInteractiveElements = () => {
    setIsScrollbarVisible(false);
    setAreButtonsVisible(false);
  };

  const resetHideTimer = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    hideTimeout.current = setTimeout(hideInteractiveElements, 2000); 
  };

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    showInteractiveElements();
    resetHideTimer();
  };

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    showInteractiveElements();
    resetHideTimer();
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    updateThumbPosition(); 
    resetHideTimer(); 
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      <div
        className={`custom-scrollbar ${
          isScrollbarVisible ? 'visible' : 'hidden'
        }`}
      >
        <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
      </div>
      <span
        className={`scroll-icon up ${areButtonsVisible ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
      >
        ▲
      </span>
      <span
        className={`scroll-icon down ${areButtonsVisible ? 'visible' : 'hidden'}`}
        onClick={scrollToBottom}
      >
        ▼
      </span>
      {children}
    </div>
  );
};

export default ScrollComponent;
