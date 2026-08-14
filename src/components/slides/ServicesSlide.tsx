import { SlideDecor } from '../SlideDecor';
import { motion } from 'framer-motion';
import { Check, Calculator, Home, Paintbrush, Ruler, Shield, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ServiceCardProps {
  type: 'cosmetic' | 'capital' | 'design';
  name: string;
  pricePerSqm: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
  image: string;
}

const ServiceCard = ({ name, pricePerSqm, description, features, icon, delay, image }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all"
  >
    <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
    <div className="p-6">
      <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 -mt-10 relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#141414] font-unbounded mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-3xl font-bold text-orange-500 font-unbounded mb-4">
        {pricePerSqm.toLocaleString('ru-RU')} ₽<span className="text-sm text-gray-500 font-manrope">/м²</span>
      </div>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const ServicesSlide = () => {
  const { getServicePrices } = useAuth();
  const [area, setArea] = useState<number>(50);
  const [selectedType, setSelectedType] = useState<'cosmetic' | 'capital' | 'design'>('cosmetic');
  const [prices, setPrices] = useState<{ cosmetic: number; capital: number; design: number }>({
    cosmetic: 8000,
    capital: 15000,
    design: 25000
  });

  useEffect(() => {
    const servicePrices = getServicePrices();
    const priceMap: Record<string, number> = {};
    servicePrices.forEach(p => { priceMap[p.type] = p.pricePerSqm; });
    setPrices({
      cosmetic: priceMap.cosmetic || 8000,
      capital: priceMap.capital || 15000,
      design: priceMap.design || 25000
    });
  }, [getServicePrices]);

  const totalCost = area * prices[selectedType];

  const services = [
    {
      type: 'cosmetic' as const,
      name: 'Косметический',
      pricePerSqm: prices.cosmetic,
      description: 'Обновление интерьера без серьёзных изменений. Идеально для свежих квартир.',
      features: ['Покраска стен и потолков', 'Замена напольных покрытий', 'Установка розеток и выключателей', 'Монтаж плинтусов', 'Уборка после работ'],
      icon: <Paintbrush className="w-7 h-7 text-orange-500" />,
      image: '/images/service-cosmetic.jpg'
    },
    {
      type: 'capital' as const,
      name: 'Капитальный',
      pricePerSqm: prices.capital,
      description: 'Полная перепланировка и замена всех коммуникаций. Для вторичного жилья.',
      features: ['Демонтаж старых покрытий', 'Выравнивание стен и полов', 'Замена электрики и сантехники', 'Укладка плитки и ламината', 'Установка дверей'],
      icon: <Home className="w-7 h-7 text-orange-500" />,
      image: '/images/service-capital.jpg'
    },
    {
      type: 'design' as const,
      name: 'Дизайнерский',
      pricePerSqm: prices.design,
      description: 'Ремонт по индивидуальному дизайн-проекту с авторским надзором.',
      features: ['Разработка дизайн-проекта', 'Авторский надзор', 'Премиум материалы', 'Сложные архитектурные решения', 'Комплектация мебелью'],
      icon: <Ruler className="w-7 h-7 text-orange-500" />,
      image: '/images/service-design.jpg'
    }
  ];

  return (
    <div className="relative isolate min-h min-h-screen bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] py-20 px-4 overflow-hidden">
      <SlideDecor number="01" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#141414] font-unbounded mb-4">
            Услуги и <span className="text-orange-500">цены</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Прозрачное ценообразование без скрытых платежей. Выберите тип ремонта и рассчитайте стоимость онлайн.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.type}
              type={service.type}
              name={service.name}
              pricePerSqm={service.pricePerSqm}
              description={service.description}
              features={service.features}
              icon={service.icon}
              delay={index * 0.15}
              image={service.image}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-orange-500" />
            <h3 className="text-2xl font-bold text-[#141414] font-unbounded">Калькулятор стоимости</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип ремонта</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="cosmetic">Косметический — {prices.cosmetic.toLocaleString('ru-RU')} ₽/м²</option>
                <option value="capital">Капитальный — {prices.capital.toLocaleString('ru-RU')} ₽/м²</option>
                <option value="design">Дизайнерский — {prices.design.toLocaleString('ru-RU')} ₽/м²</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Площадь помещения (м²)</label>
              <input
                type="number"
                min="10"
                max="500"
                value={area}
                onChange={(e) => setArea(Math.max(10, Math.min(500, parseInt(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-sm text-gray-600">Итоговая стоимость:</span>
              <span className="text-3xl font-bold text-orange-500 font-unbounded">
                {totalCost.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Гарантия до 5 лет</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Сроки от 14 дней</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Опытные мастера</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
