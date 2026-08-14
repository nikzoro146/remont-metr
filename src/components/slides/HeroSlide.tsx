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
              <div className="absolute -inset-y-[8%] -inset-x-[16%] translate-x-[6%]">
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
      className="absolute bottom-0 left-0 w-full h-40 md:h-56 pointer-events-none opacity-[0.06]"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#141414"
        d="M0,160 L0,140 L20,140 L20,60 L45,60 L45,140 L60,140 L60,90 L80,90 L80,140 L95,140 L95,30 L120,30 L120,140 L140,140 L140,75 L160,75 L160,140 L175,140 L175,50 L200,50 L200,140 L215,140 L215,95 L235,95 L235,140 L250,140 L250,20 L278,20 L278,140 L295,140 L295,70 L315,70 L315,140 L330,140 L330,45 L355,45 L355,140 L370,140 L370,85 L390,85 L390,140 L405,140 L405,35 L430,35 L430,140 L445,140 L445,65 L468,65 L468,140 L485,140 L485,25 L510,25 L510,140 L525,140 L525,80 L545,80 L545,140 L560,140 L560,55 L585,55 L585,140 L600,140 L600,90 L620,90 L620,140 L635,140 L635,40 L660,40 L660,140 L675,140 L675,70 L695,70 L695,140 L710,140 L710,30 L735,30 L735,140 L750,140 L750,85 L770,85 L770,140 L785,140 L785,50 L810,50 L810,140 L825,140 L825,95 L845,95 L845,140 L860,140 L860,25 L885,25 L885,140 L900,140 L900,75 L920,75 L920,140 L935,140 L935,45 L960,45 L960,140 L975,140 L975,90 L995,90 L995,140 L1010,140 L1010,35 L1035,35 L1035,140 L1050,140 L1050,65 L1072,65 L1072,140 L1088,140 L1088,20 L1115,20 L1115,140 L1130,140 L1130,80 L1150,80 L1150,140 L1165,140 L1165,55 L1188,55 L1188,140 L1200,140 L1200,160 Z"
      />
    </svg>
    </div>
  );
};