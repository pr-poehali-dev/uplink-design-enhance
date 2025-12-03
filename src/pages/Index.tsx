import { useState, useEffect } from 'react';
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
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botUsername, setBotUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('https://functions.poehali.dev/cf7ec4c9-16e1-4c20-833a-28733f221ac5')
      .then(res => res.json())
      .then(data => setBotUsername(data.username))
      .catch(err => console.error('Error fetching bot username:', err));
    
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
    const password = prompt('Введите пароль администратора:');
    if (password === 'fgkbyrLSI3!') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      alert('Вы вошли как администратор');
      window.location.reload();
    } else if (password) {
      alert('Неверный пароль');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
    alert('Вы вышли из режима администратора');
    window.location.reload();
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!botUsername) {
      alert('Telegram бот не настроен. Пожалуйста, свяжитесь с нами по телефону.');
      return;
    }

    const message = `Заявка от: ${contactForm.name}\n` +
      (contactForm.phone ? `Телефон: ${contactForm.phone}\n` : '') +
      (contactForm.email ? `Email: ${contactForm.email}\n` : '') +
      (contactForm.message ? `Сообщение: ${contactForm.message}` : '');
    
    const telegramUrl = `https://t.me/${botUsername}?start=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/b4335080-f4a2-47fa-a639-5f34bb22a7bf.png" 
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
                  <CardContent className="pt-6">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                        <Input 
                          placeholder="Иван Иванов" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Телефон</label>
                        <Input 
                          placeholder="+7 (___) ___-__-__" 
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input 
                          type="email" 
                          placeholder="example@mail.ru" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Сообщение</label>
                        <Textarea 
                          placeholder="Опишите ваш проект..." 
                          rows={4} 
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        <Icon name="Send" size={18} className="ml-2" />
                      </Button>
                    </form>
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
                          <h3 className="font-semibold text-lg mb-2">Телефоны</h3>
                          <div className="space-y-1">
                            <a href="tel:+79490066180" className="text-primary hover:underline text-lg block">
                              +7 (949) 006-61-80
                            </a>
                            <a href="tel:+79495143338" className="text-primary hover:underline text-lg block">
                              +7 (949) 514-33-38
                            </a>
                          </div>
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
                          <a href="mailto:uplink.control@mail.ru" className="text-primary hover:underline">
                            uplink.control@mail.ru
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
                            г. Мариуполь
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
                  src="https://cdn.poehali.dev/files/b4335080-f4a2-47fa-a639-5f34bb22a7bf.png" 
                  alt="Uplink Control" 
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="font-bold text-lg">Uplink Control</h3>
                  <p className="text-xs text-white/70">ВАШ ВЫБОР — НАШЕ РЕШЕНИЕ</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Профессиональный монтаж слаботочных систем
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
                <li className="flex items-start gap-2">
                  <Icon name="Phone" size={16} className="mt-1" />
                  <div className="space-y-1">
                    <a href="tel:+79490066180" className="hover:text-white transition-colors block">
                      +7 (949) 006-61-80
                    </a>
                    <a href="tel:+79495143338" className="hover:text-white transition-colors block">
                      +7 (949) 514-33-38
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:uplink.control@mail.ru" className="hover:text-white transition-colors">
                    uplink.control@mail.ru
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Мариуполь</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>9:00-18:00 без выходных</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="User" size={16} />
                  {!isAdmin ? (
                    <button 
                      onClick={handleAdminLogin}
                      className="hover:text-white transition-colors text-left"
                    >
                      Служебный доступ
                    </button>
                  ) : (
                    <button 
                      onClick={handleAdminLogout}
                      className="hover:text-white transition-colors text-left"
                    >
                      Выход из панели
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 text-center text-sm text-white/60">
            <p>&copy; 2025 Uplink Control. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;