import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const BlogPreviewSection = () => {
  return (
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
  );
};

export default BlogPreviewSection;
