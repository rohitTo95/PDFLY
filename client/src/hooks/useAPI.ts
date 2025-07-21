import { useAuth } from '@/contexts/AuthContext';
import { AuthenticatedAPI, PublicAPI, TokenVerifier } from '@/services/api';

/**
 * Hook that provides access to authenticated and public API methods
 * This replaces the old useAuthenticatedAPI and useSecureAPI hooks
 */
export const useAPI = () => {
  const { isAuthenticated } = useAuth();

  return {
    // Authenticated API methods (require valid token)
    authenticated: AuthenticatedAPI,
    
    // Public API methods (no authentication required)
    public: PublicAPI,
    
    // Token verification utilities
    verifyToken: TokenVerifier.verify,
    checkTokenValidity: TokenVerifier.checkTokenValidity,
    
    // Helper to determine which API to use
    getAPI: () => isAuthenticated ? AuthenticatedAPI : PublicAPI,
  };
};
