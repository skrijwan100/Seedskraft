import React, { useState, useEffect, useRef } from 'react';
import './Notice.css'; // Assuming you have a CSS file for styling
const Notice = ({ notices = [] }) => {
  // Default notices if none are provided
  const defaultNotices = [
    
    "New security policy update available",
    "Firtst Login yourSelf then order",
    "Please oder your seed one by one to avoid any confusion",
    "Add your seed to cart and then place your order",
  ];
  
  const displayNotices = notices.length > 0 ? notices : defaultNotices;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const carouselRef = useRef(null);
  
  // Automatic rotation effect
  useEffect(() => {
    if (isHovered) return; // Pause when hovered
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === displayNotices.length - 1 ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [displayNotices.length, isHovered]);
  
  // Handle next notice
  const nextNotice = () => {
    setCurrentIndex(prev => (prev === displayNotices.length - 1 ? 0 : prev + 1));
  };
  
  // Handle previous notice
  const prevNotice = () => {
    setCurrentIndex(prev => (prev === 0 ? displayNotices.length - 1 : prev - 1));
  };
  
  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    if (touchStart === 0) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextNotice();
      } else {
        prevNotice();
      }
      setTouchStart(0);
    }
  };

  return (
    <div 
      className="notice-carousel"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="carousel-content">
        <button 
          className="arrow-button prev"
          onClick={prevNotice}
          aria-label="Previous notice"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>
        
        <div className="notice-container">
          <div 
            className="notice-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayNotices.map((notice, index) => (
              <div 
                key={index} 
                className={`notice-item ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="notice-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M12 13v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="notice-text">{notice}</div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="arrow-button next"
          onClick={nextNotice}
          aria-label="Next notice"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div className="pagination">
        {displayNotices.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to notice ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Notice;
