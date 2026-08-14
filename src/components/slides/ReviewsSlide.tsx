import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AvatarInitials } from '../AvatarInitials';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  projectType: string;
}

export const ReviewsSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Александр Петров',
      location: 'Москва, ЖК "Сердце Столицы"',
      rating: 5,
      text: 'Заказывали капитальный ремонт трёхкомнатной квартиры. Работа выполнена в срок, качество на высоте. Особо отмечу работу прораба Дмитрия — всегда на связи, оперативно решал все вопросы. Рекомендую!',
      projectType: 'Капитальный ремонт, 85 м²'
    },
    {
      id: 2,
      name: 'Елена Соколова',
      location: 'Московская область, Барвиха',
      rating: 5,
      text: 'Делали дизайнерский ремонт загородного дома. Понравилось, что все работы велись по дизайн-проекту, никаких сюрпризов. Материалы закупали сами, но компания помогла с поставщиками. Итогом очень довольны!',
      projectType: 'Дизайнерский ремонт, 220 м²'
    },
    {
      id: 3,
      name: 'Михаил Васильев',
      location: 'Москва, ММДЦ Москва-Сити',
      rating: 5,
      text: 'Ремонт апартаментов в Москва-Сити требовал особого подхода. Команда справилась отлично: сложные архитектурные решения, умный дом, премиум материалы. Сдали даже на неделю раньше срока.',
      projectType: 'Дизайнерский ремонт, 120 м²'
    }
  ];

  // Автопереключение каждые 5 секунд
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#141414] font-unbounded mb-4">
            Отзывы <span className="text-orange-500">клиентов</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Реальные отзывы людей, которые уже доверили нам свой ремонт. Более 500 довольных клиентов.
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto"
                  >
                    <div className="flex items-start gap-6 mb-6">
                      <AvatarInitials name={review.name} size="lg" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#141414] font-unbounded">{review.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{review.location}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                      </div>
                      <Quote className="w-12 h-12 text-orange-200 flex-shrink-0" />
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">"{review.text}"</p>

                    <div className="bg-orange-50 rounded-lg px-4 py-3 inline-block">
                      <span className="text-sm font-medium text-orange-700">{review.projectType}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Навигация */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all z-10"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all z-10"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Индикаторы */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-orange-500 font-unbounded mb-2">500+</div>
            <div className="text-gray-600">Довольных клиентов</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-orange-500 font-unbounded mb-2">4.9</div>
            <div className="text-gray-600">Средний рейтинг</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-orange-500 font-unbounded mb-2">98%</div>
            <div className="text-gray-600">Рекомендуют нас</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
