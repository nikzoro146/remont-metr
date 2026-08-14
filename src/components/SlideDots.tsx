import { motion } from 'framer-motion';

interface SlideDotsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export const SlideDots = ({ totalSlides, currentSlide, onSlideChange }: SlideDotsProps) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className="group relative w-3 h-3 rounded-full transition-all duration-300"
          aria-label={`Перейти к слайду ${index + 1}`}
        >
          <motion.div
            className={`absolute inset-0 rounded-full ${
              index === currentSlide 
                ? 'bg-orange-500' 
                : 'bg-gray-300 group-hover:bg-gray-400'
            }`}
            initial={false}
            animate={{
              scale: index === currentSlide ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          {index === currentSlide && (
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-500"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.4 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
