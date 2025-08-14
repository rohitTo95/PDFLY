import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect authenticated users away from login/signup pages
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

interface OptionalAuthWrapperProps {
  children: React.ReactNode;
}

/**
 * OptionalAuthWrapper - Checks for authentication tokens but doesn't block access
 * This component will:
 * - Check if user has a stored token and validate it
 * - Update auth state if valid token is found
 * - Allow access regardless of authentication status
 */
export const OptionalAuthWrapper: React.FC<OptionalAuthWrapperProps> = ({ children }) => {
  const { checkAuth, isLoading } = useAuth();

  // Check auth on mount, but don't block rendering
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading only briefly to check for existing tokens
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Always render children, regardless of auth status
  return <>{children}</>;
};
