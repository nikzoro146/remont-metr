import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

const AnimatedCounter = ({ value, suffix, label, delay = 0 }: CounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-orange-500 font-unbounded">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </motion.div>
  );
};

export const HeroSlide = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
            >
              Ремонт квартир в Москве
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#141414] font-unbounded leading-tight">
              Создаём пространство{' '}
              <span className="text-orange-500">вашей мечты</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Полный цикл ремонтных работ: от дизайн-проекта до финальной уборки. 
              Гарантия качества 5 лет. Работаем с 2015 года.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 flex items-center gap-2"
              >
                Рассчитать стоимость
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#141414] text-[#141414] rounded-lg font-medium hover:bg-[#141414] hover:text-white transition-colors"
              >
                Смотреть портфолио
              </motion.button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Гарантия 5 лет</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Работа по договору</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] lg:h-full min-h-[400px]"
          >
            <iframe
              src="https://my.spline.design/roomscene-embedded/"
              className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
              style={{ border: 'none' }}
              title="3D Scene"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 md:gap-16">
            <AnimatedCounter value={9} suffix="+" label="Лет опыта" delay={0.5} />
            <AnimatedCounter value={500} suffix="+" label="Объектов" delay={0.6} />
            <AnimatedCounter value={50000} suffix=" м²" label="Площади" delay={0.7} />
          </div>
        </div>
      </div>
    </div>
  );
};
