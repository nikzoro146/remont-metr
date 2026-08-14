import { useState, useEffect, useCallback, useRef } from 'react';

export const useSlideNavigation = (totalSlides: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const lockRef = useRef(false);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    setCurrentSlide(index);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(s - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const slideContent = target.closest('[data-slide-content]') as HTMLElement | null;

      // Если у слайда есть внутренний скролл — сначала скроллим его нативно
      if (slideContent && slideContent.scrollHeight > slideContent.clientHeight + 4) {
        const atTop = slideContent.scrollTop <= 4;
        const atBottom = slideContent.scrollTop + slideContent.clientHeight >= slideContent.scrollHeight - 4;

        if (e.deltaY > 0 && !atBottom) return; // крутим контент вниз
        if (e.deltaY < 0 && !atTop) return;   // крутим контент вверх

        // Дошли до края — переключаем слайд (с блокировкой)
        if (lockRef.current) { e.preventDefault(); return; }
        lockRef.current = true;
        e.preventDefault();
        if (e.deltaY > 0) nextSlide(); else prevSlide();
        setTimeout(() => { lockRef.current = false; }, 800);
        return;
      }

      // Контент помещается целиком — переключаем сразу
      if (lockRef.current) { e.preventDefault(); return; }
      lockRef.current = true;
      e.preventDefault();
      if (e.deltaY > 0) nextSlide(); else prevSlide();
      setTimeout(() => { lockRef.current = false; }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  return { currentSlide, goToSlide, nextSlide, prevSlide, totalSlides };
};