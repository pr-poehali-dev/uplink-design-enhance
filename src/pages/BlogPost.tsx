import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/blogPosts';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      // Преобразуем дату из формата "25 января 2026" в ISO
      const monthMap: { [key: string]: string } = {
        'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
        'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
        'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
      };
      
      const dateMatch = post.date.match(/(\d+)\s+(\S+)\s+(\d{4})/);
      let isoDate = '2026-01-25T00:00:00Z'; // fallback
      
      if (dateMatch) {
        const day = dateMatch[1].padStart(2, '0');
        const month = monthMap[dateMatch[2]] || '01';
        const year = dateMatch[3];
        isoDate = `${year}-${month}-${day}T00:00:00Z`;
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": post.image,
        "datePublished": isoDate,
        "dateModified": isoDate,
        "author": {
          "@type": "Organization",
          "name": post.author,
          "url": "https://uplinkcontrol.ru"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Uplink Control",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cdn.poehali.dev/files/лого-orig-white.png"
          }
        },
        "description": post.excerpt,
        "articleSection": post.category,
        "wordCount": post.content.split(' ').length,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://uplinkcontrol.ru/blog/${post.id}`
        }
      });
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [id, post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Статья не найдена</h1>
          <Link to="/blog">
            <Button>
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Вернуться к блогу
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="blog" />
      <div className="relative h-[400px] bg-gradient-to-br from-primary/20 to-primary/5">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/blog')}
                className="mb-4"
              >
                <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Назад к блогу
              </Button>
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="User" className="w-4 h-4" />
                  {post.author}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Блог', path: '/blog' },
              { label: post.title }
            ]}
          />
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-muted-foreground prose-ul:my-4
              prose-li:my-2
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.article>

          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-12 border-t border-border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">Похожие статьи</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-muted/30 rounded-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              Наши услуги в Мариуполе
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/#services" className="flex items-start gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors group">
                <Icon name="Camera" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Монтаж видеонаблюдения</div>
                  <div className="text-sm text-muted-foreground">Установка IP-камер любой сложности</div>
                </div>
              </Link>
              <Link to="/#services" className="flex items-start gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors group">
                <Icon name="Shield" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Системы контроля доступа</div>
                  <div className="text-sm text-muted-foreground">СКУД, турникеты, домофоны</div>
                </div>
              </Link>
              <Link to="/#services" className="flex items-start gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors group">
                <Icon name="Flame" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Пожарная сигнализация</div>
                  <div className="text-sm text-muted-foreground">Проектирование и монтаж ОПС</div>
                </div>
              </Link>
              <Link to="/#services" className="flex items-start gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors group">
                <Icon name="Network" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Структурированные сети</div>
                  <div className="text-sm text-muted-foreground">Локальные сети и СКС</div>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 p-8 bg-primary/5 rounded-lg text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Остались вопросы?
            </h3>
            <p className="text-muted-foreground mb-6">
              Свяжитесь с нами для бесплатной консультации
            </p>
            <Button size="lg" onClick={handleContactClick}>
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              Связаться с нами
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}