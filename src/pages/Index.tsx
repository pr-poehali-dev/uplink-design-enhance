import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import Header from '@/components/Header';


const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Uplink Control",
      "description": "Профессиональный монтаж видеонаблюдения, систем контроля доступа, пожарной сигнализации и слаботочных систем",
      "url": "https://uplinkcontrol.ru",
      "telephone": ["+7 (949) 006-61-80", "+7 (949) 514-33-38"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Мариуполь",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "47.0956",
        "longitude": "37.5431"
      },
      "openingHours": "Mo-Su 09:00-21:00",
      "priceRange": "₽₽₽",
      "image": "https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/og-image-1766964139307.jpg",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги по монтажу",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Монтаж видеонаблюдения",
              "description": "Установка и настройка систем видеонаблюдения любой сложности"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Системы контроля доступа",
              "description": "СКУД, турникеты, электронные замки"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Пожарная сигнализация",
              "description": "Проектирование и монтаж систем пожарной безопасности"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Охранная сигнализация",
              "description": "Современные системы охранной сигнализации"
            }
          }
        ]
      }
    });
    document.head.appendChild(businessScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": "https://uplinkcontrol.ru"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      if (businessScript.parentNode) {
        businessScript.parentNode.removeChild(businessScript);
      }
      if (breadcrumbScript.parentNode) {
        breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'pricing', 'portfolio', 'contacts', 'reviews'];
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
      <Header scrollToSection={scrollToSection} />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Полезные статьи</h2>
              <p className="text-lg text-muted-foreground">
                Узнайте больше о системах безопасности из нашего блога
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <Link to="/blog/vybor-sistemy-videonablyudeniya">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/ba302d34-48ca-499d-95c0-3a7b5926061d.jpg"
                      alt="Выбор системы видеонаблюдения"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Как выбрать систему видеонаблюдения
                    </CardTitle>
                    <CardDescription>
                      Подробное руководство по выбору оптимальной системы видеонаблюдения
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <Link to="/blog/sovremennye-skud">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/da7ff09a-4e0c-46e7-8596-7f3424c61970.jpg"
                      alt="СКУД"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Современные системы контроля доступа
                    </CardTitle>
                    <CardDescription>
                      Обзор актуальных решений СКУД для офисов и бизнес-центров
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <Link to="/blog/umnyi-dom-2026">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/projects/3f6c5e91-9f9f-49a1-849d-03782890bfba/files/2461883f-3dda-42cb-a3c4-7df60f441891.jpg"
                      alt="Умный дом"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Умный дом 2026
                    </CardTitle>
                    <CardDescription>
                      Интеграция систем безопасности с технологиями умного дома
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>

            <div className="text-center">
              <Link to="/blog">
                <Button size="lg" variant="outline">
                  <Icon name="BookOpen" className="w-5 h-5 mr-2" />
                  Все статьи блога
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
                  <div className="text-5xl font-bold text-primary mb-2">от 59 990 ₽</div>
                  <p className="text-muted-foreground">Под ключ — всё включено</p>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/4-кам-без-фона.png" 
                        alt="4 IP-камеры HiWatch"
                        loading="lazy"
                        className="w-full max-w-4xl object-contain"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex justify-center">
                        <img 
                          src="https://cdn.poehali.dev/files/регик.png" 
                          alt="IP-видеорегистратор HiWatch"
                          loading="lazy"
                          className="w-full max-w-sm object-contain"
                        />
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="https://cdn.poehali.dev/files/HDD.png" 
                          alt="Жёсткий диск 2TB WD Purple"
                          loading="lazy"
                          className="w-full max-w-sm object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/Свитч.png" 
                        alt="PoE-свитч"
                        loading="lazy"
                        className="w-full max-w-3xl object-contain"
                      />
                    </div>

                    <div className="flex justify-center w-full">
                      <img 
                        src="https://cdn.poehali.dev/files/4-коробки.png" 
                        alt="Монтажные коробки"
                        loading="lazy"
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

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Видеонаблюдение в Мариуполе — надёжная защита вашего объекта</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Uplink Control</strong> — профессиональная компания по установке систем видеонаблюдения в Мариуполе. 
                  Мы специализируемся на монтаже камер видеонаблюдения для частных домов, квартир, офисов, магазинов, складов и производственных объектов.
                </p>
                
                <p>
                  <strong className="text-foreground">Установка видеонаблюдения в Мариуполе</strong> под ключ включает полный комплекс работ: 
                  бесплатный выезд специалиста, проектирование системы, монтаж камер и оборудования, прокладку кабелей, настройку удалённого доступа 
                  через интернет и обучение работе с системой. Гарантия на все работы — 3 года.
                </p>

                <div className="bg-background rounded-lg p-6 my-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Почему выбирают нас для монтажа видеонаблюдения:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Опыт более 5 лет</strong> — установили более 100 систем видеонаблюдения в Мариуполе</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Бесплатный выезд мастера</strong> и составление сметы без обязательств</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Гарантия 3 года</strong> на оборудование и монтажные работы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Удалённый доступ</strong> к камерам через мобильное приложение — смотрите видео из любой точки мира</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Монтаж за 1-2 дня</strong> — быстрая установка без простоев</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Мы работаем с современным оборудованием: <strong className="text-foreground">IP-камеры 4K разрешения</strong>, видеорегистраторы с большим объёмом 
                  памяти, системы с аналитикой и распознаванием лиц. Также устанавливаем <strong className="text-foreground">СКУД (системы контроля доступа)</strong>, 
                  охранную и пожарную сигнализацию в Мариуполе.
                </p>

                <p>
                  <strong className="text-foreground">Купить и установить камеры видеонаблюдения в Мариуполе</strong> можно по телефонам 
                  <a href="tel:+79490066180" className="text-primary font-semibold hover:underline ml-1">+7 (949) 006-61-80</a> или
                  <a href="tel:+79495143338" className="text-primary font-semibold hover:underline ml-1">+7 (949) 514-33-38</a>, а также оставив заявку на сайте. 
                  Наши специалисты проконсультируют вас, помогут подобрать оптимальное решение и рассчитают стоимость проекта.
                </p>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Популярные услуги в Мариуполе:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Camera" size={18} className="text-primary flex-shrink-0" />
                      <span>Установка камер видеонаблюдения для дома</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Building2" size={18} className="text-primary flex-shrink-0" />
                      <span>Видеонаблюдение для офиса и склада</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="ShoppingCart" size={18} className="text-primary flex-shrink-0" />
                      <span>Системы безопасности для магазинов</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wifi" size={18} className="text-primary flex-shrink-0" />
                      <span>IP-видеонаблюдение с удалённым доступом</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={18} className="text-primary flex-shrink-0" />
                      <span>СКУД и системы контроля доступа</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Bell" size={18} className="text-primary flex-shrink-0" />
                      <span>Охранная и пожарная сигнализация</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-gradient-to-br from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Свяжитесь с нами
                </h2>
                <p className="text-lg text-muted-foreground">
                  Оставьте заявку для общения в мессенджере Telegram
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="h-fit">
                  <CardContent className="pt-6 pb-6">
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

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Share2" size={24} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-3">Мы в соцсетях</h3>
                          <div className="flex flex-col gap-3">
                            <a 
                              href="https://vk.com/uplink.ctrl" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0077FF] hover:bg-[#0066DD] text-white transition-all hover:scale-105"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.25 14.97h-1.41c-.58 0-.76-.46-1.82-1.52-.91-.91-1.31-1.03-1.54-1.03-.31 0-.4.09-.4.53v1.39c0 .37-.12.59-1.11.59-1.64 0-3.45-.99-4.73-2.84-1.92-2.71-2.44-4.75-2.44-5.16 0-.23.09-.44.53-.44h1.41c.4 0 .55.18.7.61.78 2.13 2.1 4 2.64 4 .2 0 .29-.09.29-.61v-2.37c-.06-.98-.57-1.06-.57-1.41 0-.18.15-.37.4-.37h2.22c.33 0 .46.18.46.58v3.21c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.28-.44.71-.44h1.41c.48 0 .58.24.48.58-.17.82-1.91 3.52-1.91 3.52-.16.27-.22.39 0 .7.17.23.72.71 1.09 1.14.68.76 1.2 1.39 1.34 1.83.14.45-.08.67-.53.67z"/>
                              </svg>
                              <span className="text-sm font-medium">ВКонтакте</span>
                            </a>
                            <a 
                              href="https://t.me/uplinkctrl180" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0088cc] hover:bg-[#0077b3] text-white transition-all hover:scale-105"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                              </svg>
                              <span className="text-sm font-medium">Telegram канал</span>
                            </a>
                            <a 
                              href="https://t.me/UPlinkControl_bot" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0088cc] to-[#229ED9] hover:from-[#0077b3] hover:to-[#1a8dc4] text-white transition-all hover:scale-105"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                              </svg>
                              <span className="text-sm font-medium">Telegram бот</span>
                            </a>
                          </div>
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

      <footer className="bg-secondary/80 border-t border-primary/20 text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>
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
              <p className="text-white/70 text-sm mb-4">
                Профессиональный монтаж слаботочных систем в Мариуполе
              </p>
              
              <div className="flex flex-col gap-3 group">
                <h4 className="font-semibold text-sm">Мы в соцсетях</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://vk.com/uplink.ctrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0077FF] hover:bg-[#0066DD] transition-all hover:scale-110 relative group/vk"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.25 14.97h-1.41c-.58 0-.76-.46-1.82-1.52-.91-.91-1.31-1.03-1.54-1.03-.31 0-.4.09-.4.53v1.39c0 .37-.12.59-1.11.59-1.64 0-3.45-.99-4.73-2.84-1.92-2.71-2.44-4.75-2.44-5.16 0-.23.09-.44.53-.44h1.41c.4 0 .55.18.7.61.78 2.13 2.1 4 2.64 4 .2 0 .29-.09.29-.61v-2.37c-.06-.98-.57-1.06-.57-1.41 0-.18.15-.37.4-.37h2.22c.33 0 .46.18.46.58v3.21c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.28-.44.71-.44h1.41c.48 0 .58.24.48.58-.17.82-1.91 3.52-1.91 3.52-.16.27-.22.39 0 .7.17.23.72.71 1.09 1.14.68.76 1.2 1.39 1.34 1.83.14.45-.08.67-.53.67z"/>
                    </svg>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/vk:opacity-100 transition-opacity pointer-events-none">ВКонтакте</span>
                  </a>
                  <a 
                    href="https://t.me/uplinkctrl180" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0088cc] hover:bg-[#0077b3] transition-all hover:scale-110 relative group/tg"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tg:opacity-100 transition-opacity pointer-events-none">Telegram канал</span>
                  </a>
                  <a 
                    href="https://t.me/UPlinkControl_bot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0088cc] to-[#229ED9] hover:from-[#0077b3] hover:to-[#1a8dc4] transition-all hover:scale-110 relative group/bot"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                    </svg>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/bot:opacity-100 transition-opacity pointer-events-none">Telegram бот</span>
                  </a>
                </div>
              </div>

            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги в Мариуполе</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Установка видеонаблюдения</li>
                <li>Монтаж локальных сетей</li>
                <li>Монтаж СКС</li>
                <li>Установка СКУД</li>
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