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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'pricing', 'portfolio', 'reviews', 'contacts'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/c9e09265-a4ea-4ebe-a4bd-caa5248dec68', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          phone: contactForm.phone,
          message: contactForm.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('✅ Заявка успешно отправлена! Сейчас вы будете перенаправлены в Telegram для продолжения общения.');
        
        const botUsername = 'UPlinkControl_bot';
        const startParam = encodeURIComponent(
          `name:${contactForm.name}|phone:${contactForm.phone}|message:${contactForm.message}`
        );
        
        setContactForm({ name: '', phone: '', message: '' });
        
        setTimeout(() => {
          const telegramUrl = `tg://resolve?domain=${botUsername}&start=${startParam}`;
          const webUrl = `https://t.me/${botUsername}?start=${startParam}`;
          
          window.location.href = telegramUrl;
          
          setTimeout(() => {
            window.open(webUrl, '_blank');
          }, 500);
        }, 1500);
      } else {
        alert('❌ Ошибка отправки заявки. Попробуйте позвонить нам по телефону.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Ошибка отправки заявки. Попробуйте позвонить нам по телефону.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/лого-orig-white.png" 
                alt="Uplink Control" 
                className="h-24 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Uplink Control</h1>
                <p className="text-xs text-muted-foreground">ВАШ ВЫБОР — НАШЕ РЕШЕНИЕ</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['home', 'services', 'pricing', 'portfolio', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-[#ff6b35] ${
                    activeSection === section ? 'text-[#ff6b35]' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'services' && 'Услуги'}
                  {section === 'pricing' && 'Стоимость'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'reviews' && 'Отзывы'}
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

        <section id="pricing" className="py-20 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Стоимость</h2>
              <p className="text-lg text-muted-foreground">
                Базовый комплект видеонаблюдения для частного дома
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="mb-8 overflow-hidden border-2 border-primary/20">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center border-b border-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Базовый комплект видеонаблюдения</h3>
                  <div className="text-5xl font-bold text-primary mb-2">79 990 ₽</div>
                  <p className="text-muted-foreground">Под ключ — всё включено</p>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/4-кам-без-фона.png" 
                        alt="4 IP-камеры HiWatch"
                        className="w-full max-w-4xl object-contain"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex justify-center">
                        <img 
                          src="https://cdn.poehali.dev/files/регик.png" 
                          alt="IP-видеорегистратор HiWatch"
                          className="w-full max-w-sm object-contain"
                        />
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="https://cdn.poehali.dev/files/HDD.png" 
                          alt="Жёсткий диск 2TB WD Purple"
                          className="w-full max-w-sm object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/Свитч.png" 
                        alt="PoE-свитч"
                        className="w-full max-w-3xl object-contain"
                      />
                    </div>

                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/4-коробки.png" 
                        alt="Монтажные коробки"
                        className="w-full max-w-4xl object-contain"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6 mb-6">
                    <h4 className="text-xl font-bold text-foreground mb-6 text-center">Что входит в базовый комплект видеонаблюдения</h4>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Package" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">IP-камеры — 4 шт.</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Уличного исполнения</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Разрешение 4 МП</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Инфракрасная подсветка для ночной съемки</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Класс защиты IP67 (пыле- и влагозащита)</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Monitor" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">IP-видеорегистратор (NVR) на 4 канала</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Запись и просмотр в реальном времени</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Удаленный доступ через интернет</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> HDMI/VGA выходы для подключения монитора</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="HardDrive" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Жёсткий диск HDD — 2 TB</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Специализированный накопитель для систем видеонаблюдения</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Объём 2 ТБ (хранение архива до 30 дней)</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Network" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">PoE-коммутатор (свитч)</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> 4 порта PoE (питание + передача данных)</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Централизованное питание камер по сетевому кабелю</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Cable" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Сетевой кабель — 80 метров</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Витая пара категории Cat5e или Cat6</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Для подключения камер к коммутатору</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Box" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Монтажные материалы</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Кабель-каналы для защиты и эстетичной прокладки кабелей</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Wrench" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Монтажные работы</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 ml-8">Включает:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Dot" size={16} className="text-primary mt-0.5" /> Проектирование и разметка точек установки</li>
                          <li className="flex items-start gap-2"><Icon name="Dot" size={16} className="text-primary mt-0.5" /> Монтаж камер на объекте</li>
                          <li className="flex items-start gap-2"><Icon name="Dot" size={16} className="text-primary mt-0.5" /> Прокладка кабельных линий (80 м)</li>
                          <li className="flex items-start gap-2"><Icon name="Dot" size={16} className="text-primary mt-0.5" /> Установка кабель-каналов и креплений</li>
                          <li className="flex items-start gap-2"><Icon name="Dot" size={16} className="text-primary mt-0.5" /> Коммутация оборудования</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="Settings" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Настройка и конфигурация системы</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Настройка видеорегистратора (каналы, запись, расписание)</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Конфигурация сетевых параметров</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Настройка удаленного доступа (веб-интерфейс, мобильное приложение)</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Калибровка углов обзора камер</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                          <h5 className="font-semibold text-foreground">Пусконаладочные работы и инструктаж</h5>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-8">
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Комплексное тестирование системы</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Проверка качества видеозаписи</li>
                          <li className="flex items-start gap-2"><Icon name="Check" size={16} className="text-primary mt-0.5" /> Обучение работе с системой видеонаблюдения</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-6 border border-accent/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="DollarSign" className="text-primary" size={24} />
                      <h4 className="text-xl font-bold text-foreground">Ценообразование</h4>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      Мы предлагаем профессиональную установку систем видеонаблюдения с прозрачным и обоснованным ценообразованием.
                      Представленная стоимость рассчитана на базовый комплект из 4 камер — оптимальное решение для частного дома.
                    </p>

                    <p className="text-muted-foreground mb-3">
                      Итоговая стоимость проекта формируется индивидуально и зависит от следующих факторов:
                    </p>

                    <ul className="space-y-2 mb-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <Icon name="Camera" className="text-primary mt-1" size={18} />
                        <span>Тип и технические характеристики камер</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Building" className="text-primary mt-1" size={18} />
                        <span>Особенности объекта и сложность монтажных работ</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Ruler" className="text-primary mt-1" size={18} />
                        <span>Протяженность кабельных трасс</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Settings" className="text-primary mt-1" size={18} />
                        <span>Необходимость дополнительного оборудования и расширенных настроек</span>
                      </li>
                    </ul>

                    <div className="bg-background rounded-lg p-4 mb-4">
                      <p className="font-semibold text-foreground mb-3">Для вашего удобства мы предоставляем:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={18} className="text-primary mt-0.5" />
                          <span>Бесплатный выезд специалиста</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={18} className="text-primary mt-0.5" />
                          <span>Бесплатные замеры и консультации</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        Вы заранее будете понимать полную стоимость и состав работ без скрытых платежей.
                      </p>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Gift" className="text-primary" size={20} />
                        <h5 className="text-lg font-bold text-primary">Специальная акция</h5>
                      </div>
                      <p className="text-foreground font-semibold mb-2">
                        Воспользуйтесь выгодным предложением:<br />
                        каждая 5-я камера в подарок!
                      </p>
                      <div className="flex items-start gap-2 mt-3">
                        <Icon name="Info" className="text-muted-foreground mt-0.5" size={16} />
                        <p className="text-sm text-muted-foreground">
                          В рамках акции предоставляется только оборудование. Работы по установке, подключению, настройке и расходные материалы оплачиваются дополнительно.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-muted-foreground mt-4">
                      <Icon name="Phone" className="text-primary mt-0.5" size={18} />
                      <p>
                        Свяжитесь с нами, и мы разработаем надёжное решение по видеонаблюдению, полностью соответствующее вашим задачам и бюджету.
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Button 
                      onClick={() => scrollToSection('contacts')} 
                      size="lg"
                      className="text-lg px-8"
                    >
                      <Icon name="Phone" size={20} className="mr-2" />
                      Заказать консультацию
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <PortfolioSection />

        <section id="contacts" className="py-20 bg-gradient-to-br from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Свяжитесь с нами</h2>
                <p className="text-lg text-muted-foreground">
                  Оставьте заявку для общения в мессенджере Telegram
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
                        <label className="text-sm font-medium mb-2 block">Сообщение</label>
                        <Textarea 
                          placeholder="Опишите ваш проект..." 
                          rows={4} 
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white" 
                        size="lg" 
                        disabled={isSubmitting}
                      >
                        <Icon name="Send" size={18} className="mr-2" />
                        {isSubmitting ? 'Отправка...' : 'Перейти в Telegram'}
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
                  src="https://cdn.poehali.dev/files/лого-orig-white.png" 
                  alt="Uplink Control" 
                  className="h-24 w-auto"
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