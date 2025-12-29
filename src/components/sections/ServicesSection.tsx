import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ServicesSection = () => {
  const services = [
    {
      icon: 'Camera',
      title: 'Видеонаблюдение',
      description: 'Проектирование и монтаж систем видеонаблюдения любой сложности. IP и аналоговые камеры, удаленный доступ.'
    },
    {
      icon: 'Network',
      title: 'ЛВС',
      description: 'Построение локальных вычислительных сетей. Прокладка кабелей, настройка оборудования, тестирование.'
    },
    {
      icon: 'Cable',
      title: 'СКС',
      description: 'Структурированные кабельные системы под ключ. Проектирование, монтаж, сертификация сетей.'
    },
    {
      icon: 'ShieldCheck',
      title: 'СКУД',
      description: 'Системы контроля и управления доступом. Электронные замки, считыватели, турникеты, интеграция с учетом.'
    }
  ];

  const additionalServices = [
    'Проектирование систем безопасности',
    'Настройка и программирование оборудования',
    'Модернизация существующих систем',
    'Техническое обслуживание',
    'Сборка и монтаж сетевых шкафов',
    'Установка систем умного дома',
    'Монтаж домофонных систем',
    'Консультации по выбору оборудования'
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши услуги</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полный спектр работ по проектированию и монтажу слаботочных систем
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-scale transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50 h-full relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-50">
                  {index === 0 && '❄️'}
                  {index === 1 && '⭐'}
                  {index === 2 && '🎄'}
                  {index === 3 && '✨'}
                </div>
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-lg p-8 border">
          <h3 className="text-2xl font-bold text-foreground mb-6">Дополнительные услуги</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {additionalServices.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;