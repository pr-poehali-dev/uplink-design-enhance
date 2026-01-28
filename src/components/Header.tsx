import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  scrollToSection?: (section: string) => void;
  variant?: 'default' | 'blog';
}

export default function Header({ scrollToSection, variant = 'default' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Главная', section: 'home', path: '/' },
    { label: 'Услуги', section: 'services', path: '/#services' },
    { label: 'Портфолио', section: 'portfolio', path: '/#portfolio' },
    { label: 'Отзывы', section: 'reviews', path: '/#reviews' },
    { label: 'Блог', section: 'blog', path: '/blog' },
    { label: 'Контакты', section: 'contacts', path: '/#contacts' }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.path.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = item.path.replace('/#', '');
          scrollToSection?.(section);
        }, 100);
      } else {
        scrollToSection?.(item.section);
      }
    } else {
      navigate(item.path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://cdn.poehali.dev/files/лого-orig-white.png" 
                alt="Uplink Control" 
                className="h-16 md:h-24 w-auto"
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground">Uplink Control</h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">ВАШ ВЫБОР — НАШЕ РЕШЕНИЕ</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleMenuClick(item)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[88px] md:top-[104px] left-0 right-0 z-40 bg-background border-b border-border md:hidden overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleMenuClick(item)}
                  className="text-left px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}