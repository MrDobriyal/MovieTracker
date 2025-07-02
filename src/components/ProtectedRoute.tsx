
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Link href="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
