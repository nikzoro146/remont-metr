import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideLayoutProps {
  children: React.ReactNode;
  isActive: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  showNav?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export const SlideLayout = ({ 
  children, 
  isActive, 
  onPrev, 
  onNext,
  showNav = true,
  isFirst = false,
  isLast = false
}: SlideLayoutProps) => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: isActive ? 10 : 0 }}
    >
      <div 
        className={`w-full h-full overflow-y-auto ${!showNav ? 'pb-20' : ''}`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="min-h-full">
          {children}
        </div>
      </div>

      {showNav && !isFirst && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {showNav && !isLast && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </motion.div>
  );
};
