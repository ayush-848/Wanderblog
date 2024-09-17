import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('AuthContext is undefined. Ensure AuthProvider is properly set up.');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;