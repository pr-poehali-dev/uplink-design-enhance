import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PricingSectionProps {
  scrollToSection: (section: string) => void;
}

const PricingSection = ({ scrollToSection }: PricingSectionProps) => {
  return (
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
  );
};

export default PricingSection;
