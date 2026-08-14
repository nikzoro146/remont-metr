import { SlideDecor } from '../SlideDecor';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const ContactsSlide = () => {
  const { addLead } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone: string): boolean => {
    // Удаляем все нецифровые символы
    const cleaned = phone.replace(/\D/g, '');
    // Проверяем длину (11 цифр для РФ)
    return cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'));
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно быть не менее 2 символов';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер (например, +7 999 123-45-67)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Имитация задержки отправки
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addLead({
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      message: formData.message.trim()
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Форматирование номера
    if (value.length > 0) {
      if (value.startsWith('8')) {
        value = '7' + value.slice(1);
      }
      if (!value.startsWith('7')) {
        value = '7' + value;
      }
    }
    
    setFormData({ ...formData, phone: value });
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
  };

  const formatPhoneDisplay = (value: string): string => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
    }
    return value;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] py-20 px-4 overflow-hidden">
      <SlideDecor number="05" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#141414] font-unbounded mb-4">
            Контакты
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Консультация бесплатна.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Форма заявки */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#141414] font-unbounded mb-2">
                Рассчитать стоимость ремонта
              </h3>
              <p className="text-gray-600 mb-6">
                Оставьте заявку, и мы перезвоним в течение 15 минут для уточнения деталей.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-[#141414] mb-2">Заявка отправлена!</h4>
                  <p className="text-gray-600 mb-6">
                    Наш менеджер свяжется с вами в ближайшее время.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Отправить ещё одну заявку
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Иван Петров"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={formatPhoneDisplay(formData.phone)}
                      onChange={handlePhoneChange}
                      placeholder="+7 (999) 123-45-67"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Тип ремонта, площадь, пожелания..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимаю кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#141414] font-unbounded mb-6">
                Наши контакты
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141414] mb-1">Адрес офиса</h4>
                    <p className="text-gray-600">Москва, Пресненская наб., 12 (Москва-Сити)</p>
                    <p className="text-gray-500 text-sm">Башня Федерация, офис 45</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141414] mb-1">Телефон</h4>
                    <a href="tel:+74951234567" className="text-lg font-bold text-orange-500 hover:underline">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-gray-500 text-sm">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141414] mb-1">Email</h4>
                    <a href="mailto:info@metr-remont.ru" className="text-orange-500 hover:underline">
                      info@metr-remont.ru
                    </a>
                    <p className="text-gray-500 text-sm">Отвечаем в течение 2 часов</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141414] mb-1">Режим работы</h4>
                    <p className="text-gray-600">Пн–Пт: 9:00 – 21:00</p>
                    <p className="text-gray-600">Сб–Вс: 10:00 – 18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-[#141414] mb-4">Мы в соцсетях</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-64">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A0d1e1a1b1c1d1e1f1a1b1c1d1e1f1a1b&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
