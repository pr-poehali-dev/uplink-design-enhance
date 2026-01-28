import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/blogPosts';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
            className="mt-12 p-8 bg-primary/5 rounded-lg text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Остались вопросы?
            </h3>
            <p className="text-muted-foreground mb-6">
              Свяжитесь с нами для бесплатной консультации
            </p>
            <Link to="/#contacts">
              <Button size="lg">
                <Icon name="Phone" className="w-5 h-5 mr-2" />
                Связаться с нами
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}