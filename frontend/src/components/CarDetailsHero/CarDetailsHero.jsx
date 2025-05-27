import React, { useState, useRef, useEffect } from "react";
import "./CarDetailsHero.css";
import assets from "../../assets/assets";

const CarDetailsHero = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [fade, setFade] = useState(true);
  const autoSlideRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!car || car.images.length <= 1) return;

    const startAutoSlide = () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      autoSlideRef.current = setInterval(() => {
        if (!isDragging && !isTransitioning && isAutoSliding && !userInteracted) {
          setCurrentImageIndex((prev) => 
            prev === car.images.length - 1 ? 0 : prev + 1
          );
        }
      }, 5000);
    };

    if (isAutoSliding && !userInteracted) {
      startAutoSlide();
    }

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [car, isDragging, isTransitioning, isAutoSliding, userInteracted]);

  // Resume auto-slide after user interaction
  useEffect(() => {
    if (userInteracted) {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        setUserInteracted(false);
      }, 8000);
    }
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [userInteracted]);

  useEffect(() => {
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setUserInteracted(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isTransitioning) return;
    const deltaX = e.clientX - startX;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset > threshold) {
      prevImage();
    } else if (dragOffset < -threshold) {
      nextImage();
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setUserInteracted(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isTransitioning) return;
    const deltaX = e.touches[0].clientX - startX;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleIndicatorClick = (index) => {
    if (isTransitioning || index === currentImageIndex) return;
    setUserInteracted(true);
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleMouseEnter = () => {
    setUserInteracted(true);
  };

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timeout);
  }, [currentImageIndex]);

  return (
    <div className={`carDetailsHero${fade ? " carDetailsHero--fadein" : ""}`}>
      <div className="carDetailsHeroContainer">
        <div 
          className="carDetailsHeroContainerImageContainer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carDetailsHeroContainerImageContainerStack">
            {car.images.map((imageName, index) => (
              <div 
                key={index} 
                className={`carDetailsHeroContainerImageContainerStackLayer ${
                  index === currentImageIndex ? 'carDetailsHeroContainerImageContainerStackLayerActive' : ''
                }`}
                style={{
                  transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)',
                  opacity: isDragging && index === currentImageIndex ? 
                    Math.max(0.4, 1 - Math.abs(dragOffset) / 300) : 
                    (index === currentImageIndex ? 1 : 0)
                }}
              >
                <img 
                  src={assets[imageName]} 
                  alt={`${car.title} - Image ${index + 1}`} 
                  className="carDetailsHeroContainerImageContainerStackLayerImage"
                  draggable={false}
                />
                <div className="carDetailsHeroContainerImageContainerStackLayerOverlay" />
              </div>
            ))}
          </div>
          
          {/* Image Indicators */}
          {car.images.length > 1 && (
            <div className="carDetailsHeroContainerImageContainerIndicators">
              {car.images.map((_, index) => (
                <div
                  key={index}
                  className={`carDetailsHeroContainerImageContainerIndicatorsOne ${
                    index === currentImageIndex ? 'carDetailsHeroContainerImageContainerIndicatorsOneActive' : ''
                  }`}
                  onClick={() => handleIndicatorClick(index)}
                  style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}
                />
              ))}
            </div>
          )}

          {/* Auto-slide progress indicator */}
          {!userInteracted && isAutoSliding && car.images.length > 1 && (
            <div className="carDetailsHeroContainerImageContainerProgress">
              <div className="carDetailsHeroContainerImageContainerProgressBar" />
            </div>
          )}

          {/* Drag Progress Indicator */}
          {isDragging && (
            <div className="carDetailsHeroContainerImageContainerDrag">
              <div 
                className="carDetailsHeroContainerImageContainerDragBar"
                style={{
                  width: `${Math.min(100, Math.abs(dragOffset) / 80 * 100)}%`,
                  background: Math.abs(dragOffset) > 80 ? '#C3845E' : 'rgba(255,255,255,0.5)'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsHero;
