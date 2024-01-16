import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/isAuthenticated';

export const ProtectedRoute = ({ element, ...props }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica la autenticación antes de renderizar la ruta
    if (!isAuthenticated()) {
      // Si no está autenticado, redirige a la página de login
      navigate('/auth/login');
    }
  }, []); // El array vacío significa que este efecto se ejecutará solo una vez al montar el componente

  // Renderiza la ruta normalmente
  return element;
};
