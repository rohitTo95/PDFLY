
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import ThemeToggle from '../ui-custom/ThemeToggle';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import NavLink, { mainNavLinks } from './NavLinks';
import ToolsDropdown from './ToolsDropdown';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "py-2 glass-light dark:glass-dark" : "py-4 bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <FileText className="h-8 w-8" />
            <span className="text-xl font-medium">PDF Tools</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4 mr-4">
              {mainNavLinks.slice(0, 4).map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
              
              <ToolsDropdown scrolled={scrolled} />
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {user?.username || user?.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <LogIn className="mr-1 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="flex items-center">
                      <UserPlus className="mr-1 h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isOpen} />
    </header>
  );
};

export default Navbar;
