import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { TokenManager, TokenVerifier, PublicAPI } from '@/services/api';

interface User {
  id: string;
  email: string;
  username: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  verifyToken: (token?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Decode JWT token to get user info
  const decodeToken = (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await PublicAPI.post('/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data?.token) {
        const { token: authToken, profile } = response.data;
        
        setToken(authToken);
        TokenManager.set(authToken);
        
        const userInfo = decodeToken(authToken);
        if (userInfo) {
          setUser({ ...userInfo, ...profile });
        }

        toast({
          title: 'Login Successful',
          description: 'You have been logged in successfully',
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your credentials and try again',
      });
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await PublicAPI.post('/signup', {
        username: name,
        email,
        password,
      });

      if (response.status === 200) {
        toast({
          title: 'Registration Successful',
          description: 'Your account has been created successfully. Please log in.',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'There was an error creating your account',
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    TokenManager.remove();
    
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  // Verify token function for external use
  const verifyToken = async (tokenToVerify?: string): Promise<boolean> => {
    const targetToken = tokenToVerify || token;
    if (!targetToken) return false;

    const verification = await TokenVerifier.verify(targetToken);
    return verification.valid;
  };

  // Check authentication status using token verification
  const checkAuth = async (): Promise<boolean> => {
    const storedToken = TokenManager.get();
    
    if (!storedToken) {
      setIsLoading(false);
      return false;
    }

    // Use the verify-token API instead of local JWT decoding
    const verification = await TokenVerifier.verify(storedToken);
    
    if (verification.valid && verification.payload) {
      const userInfo: User = {
        id: verification.payload.sub,
        email: verification.payload.email,
        username: verification.payload.username,
      };
      
      setToken(storedToken);
      setUser(userInfo);
      setIsLoading(false);
      return true;
    } else {
      // Token is invalid or expired
      TokenManager.remove();
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return false;
    }
  };

  // Listen for logout events from the token verifier
  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  // Check auth on component mount and set up periodic token validation
  useEffect(() => {
    checkAuth();

    // Set up periodic token validation (every 5 minutes)
    const interval = setInterval(async () => {
      const currentToken = TokenManager.get();
      if (currentToken && isAuthenticated) {
        const isValid = await TokenVerifier.checkTokenValidity();
        if (!isValid) {
          // User will be logged out by the token verifier
          setUser(null);
          setToken(null);
        }
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
