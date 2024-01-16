export const isAuthenticated = () => {
  // Implementa tu lógica de verificación de autenticación aquí
  // Puedes usar el token almacenado en localStorage o en el estado de tu aplicación, por ejemplo
  const token = localStorage.getItem('authToken');
  return token !== null; // Devuelve true si el usuario está autenticado, de lo contrario, false
};
