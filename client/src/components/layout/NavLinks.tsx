
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  name: string;
  path: string;
}

const NavLink = ({ name, path }: NavLinkProps) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={cn(
        "relative text-sm font-medium transition-colors hover:text-primary",
        location.pathname === path 
          ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']" 
          : "text-foreground"
      )}
    >
      {name}
    </Link>
  );
};

export const mainNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Merge PDF', path: '/merge-pdf' },
  { name: 'Compress PDF', path: '/compress-pdf' },
  { name: 'Convert PDF', path: '/convert-pdf' },
  { name: 'Contact', path: '/contact' },
];

export const pdfToolLinks = [
  { name: 'Merge PDF', path: '/merge-pdf' },
  { name: 'Split PDF', path: '/split-pdf' },
  { name: 'Remove Pages', path: '/remove-pages' },
  { name: 'Extract Pages', path: '/extract-pages' },
];

export const convertToolLinks = [
  { name: 'JPG to PDF', path: '/jpg-to-pdf' },
];

export default NavLink;
