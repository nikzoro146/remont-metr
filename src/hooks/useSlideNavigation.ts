import { useState, useEffect, useCallback } from 'react';

type TimerId = ReturnType<typeof setTimeout>;

export const useSlideNavigation = (totalSlides: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    setCurrentSlide(index);
  }, [totalSlides]);
  
  const nextSlide = useCallback(() => {
    goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
  }, [currentSlide, totalSlides, goToSlide]);
  
  const prevSlide = useCallback(() => {
    goToSlide(Math.max(currentSlide - 1, 0));
  }, [currentSlide, totalSlides, goToSlide]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
  
  useEffect(() => {
    let wheelTimeout: TimerId | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const slideContent = target.closest('[data-slide-content]') as HTMLElement;
      
      if (slideContent && slideContent.scrollHeight > slideContent.clientHeight) {
        const atTop = slideContent.scrollTop <= 5;
        const atBottom = slideContent.scrollTop + slideContent.clientHeight >= slideContent.scrollHeight - 5;
        
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          slideContent.scrollTop += e.deltaY;
          e.preventDefault();
          return;
        }
        
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
          if (isScrolling) return;
          if (wheelTimeout) clearTimeout(wheelTimeout);
          setIsScrolling(true);
          e.deltaY > 0 ? nextSlide() : prevSlide();
          wheelTimeout = setTimeout(() => setIsScrolling(false), 750);
          return;
        }
      }
      
      if (isScrolling) return;
      if (wheelTimeout) clearTimeout(wheelTimeout);
      setIsScrolling(true);
      if (e.deltaY > 0) nextSlide();
      else if (e.deltaY < 0) prevSlide();
      wheelTimeout = setTimeout(() => setIsScrolling(false), 750);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [nextSlide, prevSlide, isScrolling]);

  return { currentSlide, goToSlide, nextSlide, prevSlide, totalSlides };
};
