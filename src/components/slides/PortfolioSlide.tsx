import { motion } from 'framer-motion';
import { useState } from 'react';

interface PortfolioCase {
  id: number;
  title: string;
  location: string;
  area: number;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div
      className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      />

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
        До
      </div>
      <div className="absolute top-4 right-4 bg-orange-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
        После
      </div>
    </div>
  );
};

export const PortfolioSlide = () => {
  const cases: PortfolioCase[] = [
    {
      id: 1,
      title: 'Квартира в ЖК "Сердце Столицы"',
      location: 'Москва, Пресненский район',
      area: 85,
      duration: '3 месяца',
      beforeImage: '/images/portfolio1-before.jpg',
      afterImage: '/images/portfolio1-after.jpg'
    },
    {
      id: 2,
      title: 'Дом в посёлке "Барвиха Village"',
      location: 'Московская область, Барвиха',
      area: 220,
      duration: '6 месяцев',
      beforeImage: '/images/portfolio2-before.jpg',
      afterImage: '/images/portfolio2-after.jpg'
    },
    {
      id: 3,
      title: 'Апартаменты в "Москва-Сити"',
      location: 'Москва, ММДЦ Москва-Сити',
      area: 120,
      duration: '4 месяца',
      beforeImage: '/images/portfolio3-before.jpg',
      afterImage: '/images/portfolio3-after.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#141414] font-unbounded mb-4">
            Портфолио <span className="text-orange-500">работ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Реальные проекты с фотографиями до и после ремонта. Перетащите ползунок, чтобы увидеть результат.
          </p>
        </motion.div>

        <div className="space-y-12">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <BeforeAfterSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#141414] font-unbounded">{item.title}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m1 1H4m12 4v4m0 0h4m-4 0l5-5m-5 5V4m-5 8V4m0 0h4m-4 0l5 5m-5-5v4" />
                      </svg>
                      <span>{item.area} м²</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold text-[#141414] mb-2">Что было сделано:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Полная перепланировка пространства</li>
                      <li>• Замена всех коммуникаций</li>
                      <li>• Дизайнерский ремонт под ключ</li>
                      <li>• Комплектация мебелью и декором</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
