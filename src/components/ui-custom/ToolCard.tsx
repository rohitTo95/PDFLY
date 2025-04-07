
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  className?: string;
}

const ToolCard = ({ title, description, icon: Icon, path, className }: ToolCardProps) => {
  return (
    <Link 
      to={path}
      className={cn(
        "group p-6 rounded-2xl border border-border bg-card hover:shadow-lg",
        "transition-all duration-300 ease-in-out h-full",
        "hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1",
        "dark:hover:bg-primary/10 flex flex-col",
        className
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-4">
          <div className="p-3 w-fit rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          
          <h3 className="text-xl font-semibold">{title}</h3>
          
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        
        <div className="flex items-center text-primary text-sm font-medium pt-6">
          <span className="mr-1">Use Tool</span>
          <svg 
            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
