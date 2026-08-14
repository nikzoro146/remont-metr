import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, Hammer, Key, PhoneCall, Ruler, CheckCircle } from 'lucide-react';

interface TimelineStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
}

export const ProcessSlide = () => {
  const steps: TimelineStep[] = [
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: 'Заявка и консультация',
      description: 'Вы оставляете заявку на сайте или звоните нам. Менеджер проводит первичную консультацию, уточняет детали и назначает встречу с замерщиком.',
      duration: '1–2 дня'
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: 'Замер и составление сметы',
      description: 'Инженер приезжает на объект, проводит точные замеры, обсуждает ваши пожелания. Составляется детальная смета с фиксированной стоимостью.',
      duration: '2–3 дня'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Договор и предоплата',
      description: 'Подписываем официальный договор с прописанными сроками и гарантиями. Вы вносите предоплату 30% для начала работ.',
      duration: '1 день'
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      title: 'Ремонтные работы',
      description: 'Команда мастеров выполняет все этапы ремонта: демонтаж, черновые работы, чистовая отделка. Прораб ежедневно контролирует процесс.',
      duration: '14–90 дней'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Контроль качества',
      description: 'Технический специалист проверяет все работы по чек-листу. При необходимости устраняются мелкие недочёты.',
      duration: '1–2 дня'
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: 'Сдача объекта',
      description: 'Вы принимаете работу, подписываете акт приёма-передачи. Получаете ключи, гарантийный сертификат и финальный расчёт.',
      duration: '1 день'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F2] to-[#E8E8E6] py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#141414] font-unbounded mb-4">
            Этапы <span className="text-orange-500">работы</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Прозрачный процесс от заявки до сдачи объекта. Каждый этап контролируется и документируется.
          </p>
        </motion.div>

        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-300 to-gray-300" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Контент */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-20 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 inline-block max-w-md"
                  >
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-3xl font-bold text-orange-500 font-unbounded">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-xl font-bold text-[#141414] font-unbounded">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                    <div className={`flex items-center gap-2 text-xs text-gray-500 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{step.duration}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Иконка на линии */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F4F4F2] z-10">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>

                {/* Пустое пространство для балансировки */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 inline-block">
            <h3 className="text-2xl font-bold text-[#141414] font-unbounded mb-4">Готовы начать?</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Оставьте заявку сейчас и получите бесплатную консультацию инженера-замерщика в течение 24 часов.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Бесплатный выезд замерщика</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Фиксированная смета</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Гарантия 5 лет</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
