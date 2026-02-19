import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const PRODUCTS_URL = 'https://functions.poehali.dev/a180b14a-1fbe-4edd-a5af-d4fcaa88bb23';
const UPLOAD_URL = 'https://functions.poehali.dev/414540d2-8cd2-4e97-84b5-5f4a91fb472e';

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
  sort_order: number;
}

const emptyProduct: Omit<Product, 'id'> = {
  type: 'camera',
  name: '',
  description: '',
  price: 0,
  old_price: null,
  image_url: '',
  specs: {},
  is_active: true,
  sort_order: 0,
};

export default function AdminProducts() {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const jsonHeaders = { 'Content-Type': 'application/json' };

  const login = () => {
    setAdminPassword(password);
    setIsAuth(true);
    loadProducts();
  };

  const loadProducts = () => {
    setLoading(true);
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast({ title: 'Ошибка загрузки', variant: 'destructive' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isAuth) loadProducts();
  }, [isAuth]);

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({ ...product });
  };

  const startNew = () => {
    setEditing(null);
    setForm({ ...emptyProduct });
  };

  const addSpec = () => {
    if (specKey.trim()) {
      setForm(prev => ({ ...prev, specs: { ...prev.specs, [specKey.trim()]: specVal.trim() } }));
      setSpecKey('');
      setSpecVal('');
    }
  };

  const removeSpec = (key: string) => {
    setForm(prev => {
      const newSpecs = { ...prev.specs };
      delete newSpecs[key];
      return { ...prev, specs: newSpecs };
    });
  };

  const uploadImage = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Файл слишком большой (макс. 5 МБ)', variant: 'destructive' });
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
          image: base64,
          content_type: file.type,
          admin_password: adminPassword,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm(prev => ({ ...prev, image_url: data.url }));
        toast({ title: 'Картинка загружена' });
      } else {
        toast({ title: 'Ошибка загрузки картинки', variant: 'destructive' });
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Введите название', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const url = PRODUCTS_URL;
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing.id, admin_password: adminPassword } : { ...form, admin_password: adminPassword };

    const res = await fetch(url, { method, headers: jsonHeaders, body: JSON.stringify(body) });
    if (res.ok) {
      toast({ title: editing ? 'Товар обновлён' : 'Товар добавлен' });
      setEditing(null);
      setForm({ ...emptyProduct });
      loadProducts();
    } else {
      const data = await res.json().catch(() => ({}));
      toast({ title: data.error || 'Ошибка', variant: 'destructive' });
    }
    setLoading(false);
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить товар?')) return;
    const res = await fetch(`${PRODUCTS_URL}?id=${id}&admin_password=${encodeURIComponent(adminPassword)}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Товар удалён' });
      loadProducts();
    }
  };

  const toggleActive = async (product: Product) => {
    await fetch(PRODUCTS_URL, {
      method: 'PUT',
      headers: jsonHeaders,
      body: JSON.stringify({ id: product.id, is_active: !product.is_active, admin_password: adminPassword }),
    });
    loadProducts();
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Админ-панель товаров</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Пароль администратора"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
            />
            <Button className="w-full" onClick={login}>
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Управление товарами</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open('/products', '_blank')}>
              <Icon name="ExternalLink" size={14} className="mr-1" />
              Каталог
            </Button>
            <Button variant="outline" size="sm" onClick={startNew}>
              <Icon name="Plus" size={14} className="mr-1" />
              Добавить
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editing ? 'Редактирование' : 'Новый товар'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {([
                    ['camera', 'Камера'],
                    ['kit', 'Комплект'],
                    ['recorder', 'Регистратор'],
                    ['switch', 'Коммутатор'],
                    ['other', 'Разное'],
                  ] as const).map(([key, label]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={form.type === key ? 'default' : 'outline'}
                      onClick={() => setForm(prev => ({ ...prev, type: key }))}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Название"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <Textarea
                  placeholder="Описание"
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="resize-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Цена"
                    value={form.price || ''}
                    onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                  />
                  <Input
                    type="number"
                    placeholder="Старая цена"
                    value={form.old_price || ''}
                    onChange={e => setForm(prev => ({ ...prev, old_price: Number(e.target.value) || null }))}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Изображение</p>
                  {form.image_url ? (
                    <div className="relative">
                      <img src={form.image_url} alt="preview" className="w-full h-32 object-contain rounded bg-muted" />
                      <button
                        onClick={() => setForm(prev => ({ ...prev, image_url: '' }))}
                        className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${uploading ? 'pointer-events-none opacity-60' : 'border-muted-foreground/30'}`}>
                      {uploading ? (
                        <>
                          <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground mb-1" />
                          <span className="text-sm text-muted-foreground">Загрузка...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Upload" size={24} className="text-muted-foreground mb-1" />
                          <span className="text-sm text-muted-foreground">Нажмите для загрузки</span>
                          <span className="text-xs text-muted-foreground/60">JPG, PNG, WebP до 5 МБ</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  )}
                  <Input
                    placeholder="Или вставьте URL"
                    value={form.image_url}
                    onChange={e => setForm(prev => ({ ...prev, image_url: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Сортировка (0 = первый)"
                  value={form.sort_order || ''}
                  onChange={e => setForm(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                />

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Характеристики</p>
                  {Object.entries(form.specs).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-1 text-sm bg-muted rounded px-2 py-1">
                      <span className="flex-1">{key}: {val}</span>
                      <button onClick={() => removeSpec(key)} className="text-muted-foreground hover:text-destructive">
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-1">
                    <Input placeholder="Ключ" value={specKey} onChange={e => setSpecKey(e.target.value)} className="text-sm" />
                    <Input placeholder="Значение" value={specVal} onChange={e => setSpecVal(e.target.value)} className="text-sm" />
                    <Button size="sm" variant="outline" onClick={addSpec}>
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={save} disabled={loading}>
                    {loading ? <Icon name="Loader2" size={16} className="animate-spin mr-1" /> : <Icon name="Save" size={16} className="mr-1" />}
                    {editing ? 'Сохранить' : 'Добавить'}
                  </Button>
                  {editing && (
                    <Button variant="outline" onClick={startNew}>
                      Отмена
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {loading && products.length === 0 ? (
              <div className="flex justify-center py-20">
                <Icon name="Loader2" size={40} className="animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="Package" size={48} className="mx-auto mb-4" />
                <p>Товаров пока нет. Добавьте первый!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map(product => (
                  <Card key={product.id} className={`${!product.is_active ? 'opacity-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded object-contain bg-muted flex-shrink-0" />
                        ) : (
                          <div className="w-16 h-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                            <Icon name="Image" size={24} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${product.type === 'kit' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                              {{ camera: 'Камера', kit: 'Комплект', recorder: 'Регистратор', switch: 'Коммутатор', other: 'Разное' }[product.type]}
                            </span>
                            {!product.is_active && (
                              <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">Скрыт</span>
                            )}
                          </div>
                          <p className="font-semibold text-foreground truncate">{product.name}</p>
                          <p className="text-primary font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button size="icon" variant="ghost" onClick={() => toggleActive(product)} title={product.is_active ? 'Скрыть' : 'Показать'}>
                            <Icon name={product.is_active ? 'Eye' : 'EyeOff'} size={16} />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => startEdit(product)}>
                            <Icon name="Pencil" size={16} />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => remove(product.id)} className="hover:text-destructive">
                            <Icon name="Trash2" size={16} />
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
      </div>
    </div>
  );
}