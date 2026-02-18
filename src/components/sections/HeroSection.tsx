import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const stats = [
    { number: '100+', label: 'Проектов' },
    { number: '5', label: 'Лет опыта' },
    { number: '70+', label: 'Клиентов' },
    { number: '24/7', label: 'Поддержка' }
  ];

  return (
    <>
      <section id="home" className="relative py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/5319ed4a-b22a-4490-9224-27e5db4ca3f8.png)' }}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Видеонаблюдение в Мариуполе<br />Установка камер и систем безопасности
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <strong>Профессиональная установка видеонаблюдения в Мариуполе</strong> — монтаж камер, СКУД, 
              охранной и пожарной сигнализации. Опыт работы 5+ лет. 
              Бесплатный выезд и консультация по Мариуполю.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <a href="tel:+79490066180">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Позвонить
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-background/50 border-primary text-foreground hover:bg-primary hover:text-primary-foreground">
                <a href="https://t.me/UPlinkControl_bot" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="hover-scale"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;