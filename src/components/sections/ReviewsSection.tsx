import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    text: '',
    rating: 5
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const API_URL = 'https://functions.poehali.dev/5a5e90b1-2c14-4f5f-98b1-7bc5c892b057';

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      try {
        setIsSubmitting(true);
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });
        
        if (response.ok) {
          const savedReview = await response.json();
          setReviews([savedReview, ...reviews]);
          setNewReview({ name: '', company: '', text: '', rating: 5 });
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAdminLogin = () => {
    const password = prompt('Введите пароль администратора:');
    if (password === 'admin2025') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      alert('Вы вошли как администратор');
    } else {
      alert('Неверный пароль');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!isAdmin) {
      alert('Только администратор может удалять отзывы');
      return;
    }
    
    if (!confirm('Удалить этот отзыв?')) return;
    
    try {
      const response = await fetch(`${API_URL}?id=${reviewId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== reviewId));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Отзывы наших клиентов</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Поделитесь своим опытом работы с нами
          </p>
          {!isAdmin && (
            <Button onClick={handleAdminLogin} variant="ghost" size="sm" className="mt-4">
              <Icon name="Lock" className="w-4 h-4 mr-2" />
              Вход для администратора
            </Button>
          )}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Оставить отзыв</CardTitle>
              <CardDescription>Расскажите о вашем опыте сотрудничества</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Имя *</label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Компания</label>
                    <Input
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      placeholder="Название компании"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Icon
                          name="Star"
                          className={`w-8 h-8 transition-colors ${
                            star <= newReview.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Отзыв *</label>
                  <Textarea
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Расскажите о вашем опыте работы с нами..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Icon name="Send" className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">Загрузка отзывов...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">Пока нет отзывов. Будьте первым!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Удалить отзыв"
                  >
                    <Icon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{review.name}</p>
                {review.company && <p className="text-sm text-muted-foreground">{review.company}</p>}
              </div>
            </motion.div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;