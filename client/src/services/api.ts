import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

// Base API configuration
const BASE_URL = 'https://esvpymxxdllnwyxwiwzi.supabase.co/functions/v1';
const PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

// Token management utilities
export const TokenManager = {
  get: (): string | null => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  },

  set: (token: string): void => {
    const isProduction = import.meta.env.PROD;
    document.cookie = `token=${token}; path=/; ${isProduction ? 'secure;' : ''} samesite=strict; max-age=${60 * 60 * 24 * 30}`;
  },

  remove: (): void => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

// Token verification response interface
interface TokenVerificationResponse {
  valid: boolean;
  payload?: {
    sub: string;
    email: string;
    username: string;
    exp: number;
  };
  error?: string;
}

// Token verification middleware
export const TokenVerifier = {
  verify: async (token: string): Promise<TokenVerificationResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-token`, 
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PUBLIC_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Token verification failed:', error);
      return {
        valid: false,
        error: error.response?.data?.error || 'Token verification failed'
      };
    }
  },

  // Middleware function to check token validity before important operations
  checkTokenValidity: async (): Promise<boolean> => {
    const token = TokenManager.get();
    if (!token) {
      return false;
    }

    const verification = await TokenVerifier.verify(token);
    if (!verification.valid) {
      TokenManager.remove();
      toast({
        variant: 'destructive',
        title: 'Session Expired',
        description: 'Your session has expired. Please log in again.',
      });
      // Trigger logout by dispatching a custom event
      window.dispatchEvent(new CustomEvent('auth:logout'));
      return false;
    }

    return true;
  }
};

// Create axios instance for authenticated requests
const createAuthenticatedAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  // Request interceptor - verify token before each request
  api.interceptors.request.use(
    async (config) => {
      const token = TokenManager.get();
      
      if (token) {
        // Verify token before making the request
        const isValid = await TokenVerifier.checkTokenValidity();
        if (!isValid) {
          return Promise.reject(new Error('Invalid token'));
        }
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = `Bearer ${PUBLIC_KEY}`;
      }
      
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle auth errors
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        const token = TokenManager.get();
        if (token) {
          const isValid = await TokenVerifier.checkTokenValidity();
          if (!isValid) {
            // Token is invalid, user will be logged out by checkTokenValidity
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

// Create axios instance for public requests
const createPublicAPI = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PUBLIC_KEY}`,
    },
  });
};

// API instances
export const authenticatedAPI = createAuthenticatedAPI();
export const publicAPI = createPublicAPI();

// Convenience methods for authenticated requests
export const AuthenticatedAPI = {
  get: (url: string, config?: AxiosRequestConfig) => authenticatedAPI.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) => authenticatedAPI.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => authenticatedAPI.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => authenticatedAPI.delete(url, config),
};

// Convenience methods for public requests
export const PublicAPI = {
  get: (url: string, config?: AxiosRequestConfig) => publicAPI.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) => publicAPI.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => publicAPI.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => publicAPI.delete(url, config),
};