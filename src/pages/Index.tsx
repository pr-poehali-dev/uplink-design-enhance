import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ReviewsSection from '@/components/sections/ReviewsSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <PortfolioSection />

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
                  <CardContent className="pt-6 space-y-4">
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
                          <h3 className="font-semibold text-lg mb-2">Телефон</h3>
                          <a href="tel:+79997770000" className="text-primary hover:underline text-lg">
                            +7 (999) 777-00-00
                          </a>
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
                          <h3 className="font-semibold text-lg mb-2">Email</h3>
                          <a href="mailto:info@uplink-ctrl.ru" className="text-primary hover:underline">
                            info@uplink-ctrl.ru
                          </a>
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
                          <h3 className="font-semibold text-lg mb-2">Адрес</h3>
                          <p className="text-muted-foreground">
                            г. Москва, ул. Примерная, д. 1
                          </p>
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
                { name: 'Cabeus', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/b056b07a-d813-41ef-9f84-685737f5806a.jpg' },
                { name: 'Cisco', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/f2bdef18-8bf8-4323-90ce-f7e69d70ddcc.jpg' },
                { name: 'Ubiquiti', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/2a404191-fd39-43aa-88af-a855088b1bc1.jpg' },
                { name: 'MikroTik', logo: 'https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/19af0433-118e-4685-b846-d50699996bb8.jpg' }
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-4 hover:shadow-xl transition-all duration-300 w-full h-32 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="max-h-20 max-w-full object-contain hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground">{brand.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection />
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
              <p className="text-white/70 text-sm">
                Профессиональный монтаж слаботочных систем с 2012 года
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Видеонаблюдение</li>
                <li>Локальные сети</li>
                <li>Структурированные кабельные системы</li>
                <li>Системы контроля доступа</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79997770000" className="hover:text-white transition-colors">
                    +7 (999) 777-00-00
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:info@uplink-ctrl.ru" className="hover:text-white transition-colors">
                    info@uplink-ctrl.ru
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Москва, ул. Примерная, д. 1</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 text-center text-sm text-white/60">
            <p>&copy; 2024 Uplink Control. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
