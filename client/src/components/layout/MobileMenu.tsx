
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainNavLinks, pdfToolLinks, convertToolLinks } from './NavLinks';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden glass-light dark:glass-dark overflow-hidden animate-slide-in-right">
      <div className="px-4 pt-2 pb-6 space-y-1">
        {mainNavLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "block px-3 py-4 text-base font-medium border-b border-border/50",
              location.pathname === link.path 
                ? "text-primary" 
                : "text-foreground hover:text-primary"
            )}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="block px-3 py-4 text-base font-medium border-b border-border/50">
          <div className="font-medium mb-2">All PDF Tools</div>
          <div className="pl-4 space-y-2">
            {pdfToolLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block py-2 text-sm",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            {convertToolLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block py-2 text-sm",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 px-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <User className="mr-2 h-4 w-4" />
                {user?.username || user?.email}
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={logout}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full flex items-center justify-center">
                  <UserPlus className="mr-1 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
