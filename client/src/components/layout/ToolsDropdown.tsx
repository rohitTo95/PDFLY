
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { pdfToolLinks, convertToolLinks } from './NavLinks';

const ToolsDropdown = ({ scrolled = false }: { scrolled?: boolean }) => {
  const location = useLocation();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className={cn(
            "text-sm font-medium bg-transparent hover:bg-accent/50 hover:text-foreground",
            scrolled ? "text-foreground" : "text-foreground"
          )}>All PDF Tools</NavigationMenuTrigger>
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
  );
};

export default ToolsDropdown;
