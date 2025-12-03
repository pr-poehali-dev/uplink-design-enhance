import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AdminButton = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleAdminLogin = () => {
    const password = prompt('Введите пароль администратора:');
    if (password === 'fgkbyrLSI3!') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      alert('Вы вошли как администратор');
      window.location.reload();
    } else if (password) {
      alert('Неверный пароль');
    }
  };

  if (isAdmin) return null;

  return (
    <Button onClick={handleAdminLogin} variant="ghost" size="sm" className="text-white/70 hover:text-white">
      <Icon name="Lock" className="w-4 h-4 mr-2" />
      Вход
    </Button>
  );
};

export default AdminButton;
