import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const PRODUCTS_URL = 'https://functions.poehali.dev/a180b14a-1fbe-4edd-a5af-d4fcaa88bb23';

interface Product {
  id: number;
  type: 'camera' | 'kit';
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  image_url: string;
  specs: Record<string, string>;
  is_active: boolean;
}

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'camera' | 'kit'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => setProducts(data.filter((p: Product) => p.is_active)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'all' ? products : products.filter(p => p.type === activeTab);
  const cameras = products.filter(p => p.type === 'camera');
  const kits = products.filter(p => p.type === 'kit');

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="blog" />

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Каталог оборудования
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Камеры видеонаблюдения и готовые комплекты для дома и бизнеса
            </p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-10">
            {[
              { key: 'all' as const, label: 'Все', count: products.length },
              { key: 'camera' as const, label: 'Камеры', count: cameras.length },
              { key: 'kit' as const, label: 'Комплекты', count: kits.length },
            ].map(tab => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.key)}
                className="gap-2"
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">{tab.count}</span>
                )}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Icon name="Loader2" size={40} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Товары скоро появятся</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                    {product.image_url && (
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.type === 'kit' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            {product.type === 'kit' ? 'Комплект' : 'Камера'}
                          </span>
                        </div>
                        {product.old_price && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              -{Math.round((1 - product.price / product.old_price) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <CardContent className="p-5">
                      <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {product.description}
                        </p>
                      )}
                      {Object.keys(product.specs).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                            <span key={key} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                              {key}: {val}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-end justify-between mt-auto">
                        <div>
                          {product.old_price && (
                            <span className="text-muted-foreground line-through text-sm mr-2">
                              {formatPrice(product.old_price)}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <Button size="sm" asChild>
                          <a href="https://t.me/uplinkctrl" target="_blank" rel="noopener noreferrer">
                            <Icon name="MessageCircle" size={16} className="mr-1" />
                            Заказать
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Нужна помощь с выбором?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Подберём оптимальное решение под ваш объект и бюджет
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <a href="tel:+79490066180">
                <Icon name="Phone" className="w-5 h-5 mr-2" />
                Позвонить
              </a>
            </Button>
            <Button size="lg" variant="outline" onClick={handleContactClick}>
              <Icon name="FileText" className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
