import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const PRODUCTS_URL = 'https://functions.poehali.dev/a180b14a-1fbe-4edd-a5af-d4fcaa88bb23';

interface Product {
  id: number;
  type: 'camera' | 'kit' | 'recorder' | 'switch' | 'other';
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
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selected, setSelected] = useState<Product | null>(null);
  const navigate = useNavigate();

  const TABS: { key: string; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'camera', label: 'Камеры' },
    { key: 'kit', label: 'Комплекты' },
    { key: 'recorder', label: 'Регистраторы' },
    { key: 'switch', label: 'Коммутаторы' },
    { key: 'other', label: 'Разное' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => setProducts(data.filter((p: Product) => p.is_active)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'all' ? products : products.filter(p => p.type === activeTab);
  const countByType = (type: string) => type === 'all' ? products.length : products.filter(p => p.type === type).length;

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

          <div className="flex justify-center flex-wrap gap-2 mb-10">
            {TABS.map(tab => {
              const count = countByType(tab.key);
              return (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.key)}
                  className="gap-2"
                >
                  {tab.label}
                  {count > 0 && (
                    <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
                  )}
                </Button>
              );
            })}
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer" onClick={() => setSelected(product)}>
                    {product.image_url && (
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.type === 'kit' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            {{ camera: 'Камера', kit: 'Комплект', recorder: 'Регистратор', switch: 'Коммутатор', other: 'Разное' }[product.type]}
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
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-end justify-between mt-auto">
                        <div>
                          {product.old_price && (
                            <span className="text-muted-foreground line-through text-xs mr-1">
                              {formatPrice(product.old_price)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <Button size="sm" onClick={e => e.stopPropagation()} asChild>
                          <a href="https://t.me/uplinkctrl" target="_blank" rel="noopener noreferrer">
                            <Icon name="MessageCircle" size={14} className="mr-1" />
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

      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selected.type === 'kit' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {{ camera: 'Камера', kit: 'Комплект', recorder: 'Регистратор', switch: 'Коммутатор', other: 'Разное' }[selected.type]}
                </span>
                {selected.old_price && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{Math.round((1 - selected.price / selected.old_price) * 100)}%
                  </span>
                )}
              </div>
              <DialogTitle className="text-2xl">{selected.name}</DialogTitle>
              {selected.description && (
                <DialogDescription className="text-base mt-2">
                  {selected.description}
                </DialogDescription>
              )}
            </DialogHeader>

            {selected.image_url && (
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  className="w-full h-64 object-contain p-4"
                />
              </div>
            )}

            {Object.keys(selected.specs).length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground mb-2">Характеристики</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(selected.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2 bg-muted/50 rounded px-3 py-2">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                {selected.old_price && (
                  <span className="text-muted-foreground line-through text-sm mr-2">
                    {formatPrice(selected.old_price)}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(selected.price)}
                </span>
              </div>
              <Button size="lg" asChild>
                <a href="https://t.me/uplinkctrl" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Заказать
                </a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}