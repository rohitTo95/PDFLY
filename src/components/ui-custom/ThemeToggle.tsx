
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme based on system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "relative p-2 w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none",
        isDarkMode ? "bg-dark-darkBlue" : "bg-light-lightBlue"
      )}
      aria-label="Toggle theme"
    >
      <span 
        className={cn(
          "absolute top-1 bottom-1 w-6 h-6 rounded-full transform transition-transform duration-300 flex items-center justify-center",
          isDarkMode 
            ? "translate-x-6 right-1 bg-dark-deepBlue text-white" 
            : "translate-x-0 left-1 bg-white text-light-deepBlue"
        )}
      >
        {isDarkMode ? (
          <Moon size={14} className="animate-scale-in" />
        ) : (
          <Sun size={14} className="animate-scale-in" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
