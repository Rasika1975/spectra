import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  console.log('ProtectedRoute - User String:', userStr);
  console.log('ProtectedRoute - Token:', token);
  
  if (!token || !userStr) {
    console.log('ProtectedRoute - No token or user found');
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    console.log('ProtectedRoute - Parsed User:', user);
    console.log('ProtectedRoute - Required Role:', allowedRole);
    
    if (user.role !== allowedRole) {
      console.log('ProtectedRoute - Role mismatch');
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error('ProtectedRoute - Error parsing user:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;