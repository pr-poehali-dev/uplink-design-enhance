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
    { label: 'Каталог', section: 'products', path: '/products' },
    { label: 'Блог', section: 'blog', path: '/blog' },
    { label: 'Контакты', section: 'contacts', path: '/#contacts' }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setMobileMenuOpen(false);
    
    if (item.path === '/') {
      if (window.location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (item.path.startsWith('/#')) {
      const section = item.path.replace('/#', '');
      
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 500);
      } else {
        const element = document.getElementById(section);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } else {
      navigate(item.path);
    }
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

            <div className="flex items-center gap-4">
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

              <div className="hidden md:flex items-center gap-2 ml-2 border-l border-border pl-4">
                <a 
                  href="https://vk.com/uplink.ctrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0077FF] hover:bg-[#0066DD] transition-all hover:scale-110"
                  title="ВКонтакте"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.25 14.97h-1.41c-.58 0-.76-.46-1.82-1.52-.91-.91-1.31-1.03-1.54-1.03-.31 0-.4.09-.4.53v1.39c0 .37-.12.59-1.11.59-1.64 0-3.45-.99-4.73-2.84-1.92-2.71-2.44-4.75-2.44-5.16 0-.23.09-.44.53-.44h1.41c.4 0 .55.18.7.61.78 2.13 2.1 4 2.64 4 .2 0 .29-.09.29-.61v-2.37c-.06-.98-.57-1.06-.57-1.41 0-.18.15-.37.4-.37h2.22c.33 0 .46.18.46.58v3.21c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.28-.44.71-.44h1.41c.48 0 .58.24.48.58-.17.82-1.91 3.52-1.91 3.52-.16.27-.22.39 0 .7.17.23.72.71 1.09 1.14.68.76 1.2 1.39 1.34 1.83.14.45-.08.67-.53.67z"/>
                  </svg>
                </a>
                <a 
                  href="https://t.me/uplinkctrl180" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0088cc] hover:bg-[#0077b3] transition-all hover:scale-110"
                  title="Telegram канал"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
                <a 
                  href="https://t.me/UPlinkControl_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0088cc] to-[#229ED9] hover:from-[#0077b3] hover:to-[#1a8dc4] transition-all hover:scale-110"
                  title="Telegram бот"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                </a>
              </div>

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
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] md:top-[104px] left-0 right-0 z-40 bg-background backdrop-blur-md border-b border-border shadow-xl md:hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleMenuClick(item)}
                  className="text-left px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95"
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