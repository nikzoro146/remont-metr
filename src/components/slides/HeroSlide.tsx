import { Model3D } from '../Model3D';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Ruler } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

const AnimatedCounter = ({ value, suffix, label, delay = 0 }: CounterProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="flex items-baseline gap-2"
  >
    <span className="text-3xl md:text-4xl font-bold text-orange-500 font-unbounded">
      {value}{suffix}
    </span>
    <span className="text-sm text-gray-600">{label}</span>
  </motion.div>
);

interface HeroSlideProps {
  onCalculate?: () => void;
  onPortfolio?: () => void;
}

export const HeroSlide = ({ onCalculate, onPortfolio }: HeroSlideProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#F4F4F2] via-[#EAEAE8] to-[#E2E2E0] overflow-hidden">
      {/* Noise-текстура */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Оранжевое градиентное пятно */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gray-800/10 blur-3xl pointer-events-none" />

      {/* Тонкая сетка */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full pt-16 pb-16">
          {/* ЛЕВАЯ КОЛОНКА */}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Ремонт квартир в Москве
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#141414] font-unbounded leading-[1.05]">
              Создаём пространство{' '}
              <span className="text-orange-500">вашей мечты</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl font-manrope">
              Полный цикл ремонтных работ: от дизайн-проекта до финальной уборки.
              Гарантия качества 5 лет. Работаем с 2015 года.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={onCalculate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 flex items-center gap-2"
              >
                Рассчитать стоимость
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={onPortfolio}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#141414] text-[#141414] rounded-lg font-medium hover:bg-[#141414] hover:text-white transition-colors"
              >
                Смотреть портфолио
              </motion.button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 font-manrope">Гарантия 5 лет</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 font-manrope">Работа по договору</span>
              </div>
            </div>

            {/* Счётчики */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <AnimatedCounter value={9} suffix="+" label="лет опыта" delay={0.5} />
              <AnimatedCounter value={500} suffix="+" label="объектов сдано" delay={0.6} />
              <AnimatedCounter value={50000} suffix=" м²" label="общая площадь" delay={0.7} />
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА — 3D */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[550px]">
            {/* Чип: Рейтинг — рядом с моделью */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute top-[30%] -left-4 md:-left-8 z-20 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-manrope">Рейтинг</div>
                  <div className="font-bold text-[#141414] text-sm">4.9 / 5</div>
                </div>
              </div>
            </motion.div>

            {/* Чип: Гарантия */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.0 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute bottom-[12%] -right-4 md:-right-8 z-20 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-manrope">Гарантия</div>
                  <div className="font-bold text-[#141414] text-sm">5 лет</div>
                </div>
              </div>
            </motion.div>

            {/* Чип: Площадь */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.2 },
                x: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute top-[22%] -right-6 md:-right-12 z-20 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Ruler className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-manrope">Площадь</div>
                  <div className="font-bold text-[#141414] text-sm">50 000+ м²</div>
                </div>
              </div>
            </motion.div>

            {/* Мягкая тень под моделью */}
            <div className="absolute inset-x-24 bottom-[18%] h-6 bg-gray-900/15 blur-2xl rounded-full pointer-events-none" />

            {/* 3D без фона */}
            <motion.div className="relative w-full h-full">
              <div className="absolute inset-0">
                <Model3D />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-[23%] left-0 right-0 flex flex-col items-center text-center text-gray-700 pointer-events-none"
              >
                <p className="text-sm font-medium opacity-90">Интерактивная 3D-кухня</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Skyline-силуэт зданий внизу */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 md:h-40 pointer-events-none opacity-[0.08]"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#141414"
          d="M0,160 L0,120 L40,120 L40,90 L60,90 L60,100 L80,100 L80,80 L100,80 L100,70 L120,70 L120,80 L140,80 L140,100 L160,100 L160,60 L180,60 L180,50 L200,50 L200,70 L220,70 L220,40 L250,40 L250,60 L280,60 L280,80 L300,80 L300,90 L320,90 L320,70 L340,70 L340,50 L370,50 L370,30 L400,30 L400,50 L420,50 L420,70 L440,70 L440,90 L460,90 L460,80 L480,80 L480,60 L510,60 L510,40 L540,40 L540,60 L560,60 L560,80 L580,80 L580,100 L600,100 L600,70 L620,70 L620,50 L650,50 L650,70 L680,70 L680,90 L700,90 L700,80 L720,80 L720,60 L750,60 L750,40 L780,40 L780,60 L800,60 L800,80 L820,80 L820,100 L840,100 L840,90 L860,90 L860,70 L890,70 L890,50 L920,50 L920,70 L940,70 L940,90 L960,90 L960,80 L980,80 L980,60 L1010,60 L1010,40 L1040,40 L1040,60 L1060,60 L1060,80 L1080,80 L1080,100 L1100,100 L1100,90 L1120,90 L1120,70 L1150,70 L1150,90 L1180,90 L1180,110 L1200,110 L1200,160 Z"
        />
      </svg>
    </div>
  );
};