import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajusta el path según tu estructura

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
