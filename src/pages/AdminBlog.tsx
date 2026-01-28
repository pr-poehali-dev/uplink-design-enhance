import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AdminBlog() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const correctPassword = 'uplink2026';
  
  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast({ title: 'Успешный вход', description: 'Добро пожаловать в админ-панель' });
    } else {
      toast({ title: 'Ошибка', description: 'Неверный пароль', variant: 'destructive' });
    }
  };
  
  const handleEdit = (post: BlogPost) => {
    setEditingPost({...post});
    setIsAdding(false);
  };
  
  const handleAddNew = () => {
    setEditingPost({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: 'Uplink Control',
      category: 'Видеонаблюдение',
      image: '',
      readTime: '5 мин'
    });
    setIsAdding(true);
  };
  
  const handleSave = () => {
    toast({ 
      title: 'Информация', 
      description: 'Для сохранения изменений обратитесь к разработчику - статьи хранятся в коде',
      variant: 'default'
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Вход в админ-панель блога</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              <Icon name="Lock" className="w-4 h-4 mr-2" />
              Войти
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Управление блогом</h1>
          <div className="flex gap-2">
            <Button onClick={handleAddNew}>
              <Icon name="Plus" className="w-4 h-4 mr-2" />
              Добавить статью
            </Button>
            <Button variant="outline" onClick={() => navigate('/blog')}>
              <Icon name="Eye" className="w-4 h-4 mr-2" />
              Просмотр блога
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
        
        {editingPost ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{isAdding ? 'Новая статья' : 'Редактирование статьи'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ID (slug)</label>
                <Input
                  value={editingPost.id}
                  onChange={(e) => setEditingPost({...editingPost, id: e.target.value})}
                  placeholder="nazvanie-stati"
                  disabled={!isAdding}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Заголовок</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Краткое описание</label>
                <Textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Input
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Время чтения</label>
                  <Input
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">URL изображения</label>
                <Input
                  value={editingPost.image}
                  onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Содержание (Markdown)</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Icon name="Save" className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleEdit(post)}>
                        <Icon name="Edit" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
