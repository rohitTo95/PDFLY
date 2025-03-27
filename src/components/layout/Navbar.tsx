
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ChevronDown } from 'lucide-react';
import ThemeToggle from '../ui-custom/ThemeToggle';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const pdfToolLinks = [
    { name: 'Merge PDF', path: '/merge-pdf' },
    { name: 'Split PDF', path: '/split-pdf' },
    { name: 'Remove Pages', path: '/remove-pages' },
    { name: 'Extract Pages', path: '/extract-pages' },
  ];
  
  const convertToolLinks = [
    { name: 'JPG to PDF', path: '/jpg-to-pdf' },
  ];
  
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
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path 
                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']" 
                    : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent/50 hover:text-foreground">PDF Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {pdfToolLinks.map((link) => (
                        <li key={link.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                location.pathname === link.path ? "bg-accent text-accent-foreground" : ""
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{link.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent/50 hover:text-foreground">Convert Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      {convertToolLinks.map((link) => (
                        <li key={link.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                location.pathname === link.path ? "bg-accent text-accent-foreground" : ""
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{link.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <ThemeToggle />
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
      {isOpen && (
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
              <div className="font-medium mb-2">PDF Tools</div>
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
              </div>
            </div>
            
            <div className="block px-3 py-4 text-base font-medium border-b border-border/50">
              <div className="font-medium mb-2">Convert Tools</div>
              <div className="pl-4 space-y-2">
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
