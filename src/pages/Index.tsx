import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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

  const portfolio = [
    {
      title: 'Установка камер на частном доме',
      description: 'IP-камеры высокого разрешения с удаленным доступом',
      image: 'https://cdn.poehali.dev/files/65fdee94-8b71-4353-a0e8-c901cc0f509d.jpg'
    },
    {
      title: 'Прокладка локальной сети в школе',
      description: 'Монтаж сетевых коммутаторов и прокладка кабельных линий',
      image: 'https://cdn.poehali.dev/files/cdd98429-7c5f-4767-8207-883dff66bf19.jpg'
    },
    {
      title: 'Прокладка локальной сети в офисном помещении',
      description: 'Структурированная кабельная система с серверным шкафом',
      image: 'https://cdn.poehali.dev/files/b79e04e5-a401-42ef-a231-fa831dcb62dd.jpg'
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://uplink-ctrl.ru/images/e0d6acdf-796a-af50-1ddf-14159e21e762.png" 
                alt="Uplink Control" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Uplink Control</h1>
                <p className="text-xs text-muted-foreground">ВАШ ВЫБОР — НАШЕ РЕШЕНИЕ</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['home', 'services', 'portfolio', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'services' && 'Услуги'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>

            <Button onClick={() => scrollToSection('contacts')} className="hidden md:flex">
              Связаться
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/5319ed4a-b22a-4490-9224-27e5db4ca3f8.png)' }}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Профессиональный монтаж<br />слаботочных систем
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Проектирование и установка систем видеонаблюдения, локальных сетей, 
                структурированных кабельных систем и систем контроля доступа
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button size="lg" onClick={() => scrollToSection('services')} className="bg-primary hover:bg-primary/90">
                  Наши услуги
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')} className="bg-background/50 border-primary text-foreground hover:bg-primary hover:text-primary-foreground">
                  Получить консультацию
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500+', label: 'Проектов' },
                { number: '12', label: 'Лет опыта' },
                { number: '200+', label: 'Клиентов' },
                { number: '24/7', label: 'Поддержка' }
              ].map((stat, index) => (
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
                  <Card className="hover-scale transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50 h-full">
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
                {[
                  'Проектирование систем безопасности',
                  'Настройка и программирование оборудования',
                  'Модернизация существующих систем',
                  'Техническое обслуживание',
                  'Сборка и монтаж сетевых шкафов',
                  'Установка систем умного дома',
                  'Монтаж домофонных систем',
                  'Консультации по выбору оборудования'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Портфолио</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Примеры наших реализованных проектов
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl h-full">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-gradient-to-br from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Свяжитесь с нами</h2>
                <p className="text-lg text-muted-foreground">
                  Оставьте заявку и получите консультацию специалиста
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Отправить заявку</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                      <Input placeholder="Иван Иванов" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <Input placeholder="+7 (___) ___-__-__" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="example@mail.ru" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Сообщение</label>
                      <Textarea placeholder="Опишите ваш проект..." rows={4} />
                    </div>
                    <Button className="w-full" size="lg">
                      Отправить заявку
                      <Icon name="Send" size={18} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Phone" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Телефоны</h3>
                          <p className="text-muted-foreground">+7 (949) 006-61-80</p>
                          <p className="text-muted-foreground">+7 (949) 514-33-38</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Mail" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Email</h3>
                          <p className="text-muted-foreground">uplink.control@mail.ru</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Адрес</h3>
                          <p className="text-muted-foreground">г. Мариуполь</p>
                          <p className="text-sm text-muted-foreground mt-1">9:00 - 18:00 без выходных</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Бренды с которыми мы работаем</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Сертифицированное оборудование от ведущих мировых производителей
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[
                { name: 'Hikvision', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/c077ceaf-ec1e-498c-bd88-591609c493a5.jpg' },
                { name: 'Dahua', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/c5940546-947f-41cb-b0a1-39805680b588.jpg' },
                { name: 'Axis', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/022f8d90-f49f-4238-86f8-427453c18594.jpg' },
                { name: 'Cisco', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/f2bdef18-8bf8-4323-90ce-f7e69d70ddcc.jpg' },
                { name: 'Ubiquiti', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/2a404191-fd39-43aa-88af-a855088b1bc1.jpg' },
                { name: 'ZKTeco', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/2773b897-25a0-4434-93ff-14ab73f48c7c.jpg' }
              ].map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <div className="bg-background rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 w-full h-32 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/80 border-t border-border text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://uplink-ctrl.ru/images/e0d6acdf-796a-af50-1ddf-14159e21e762.png" 
                  alt="Uplink Control" 
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="font-bold text-lg">Uplink Control</h3>
                  <p className="text-xs text-white/70">ВАШ ВЫБОР — НАШЕ РЕШЕНИЕ</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                Профессиональный монтаж слаботочных систем любой сложности
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Видеонаблюдение</li>
                <li>Локальные сети</li>
                <li>СКС</li>
                <li>СКУД</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>+7 (949) 006-61-80</li>
                <li>+7 (949) 514-33-38</li>
                <li>uplink.control@mail.ru</li>
                <li>г. Мариуполь</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2025 Uplink Control. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;