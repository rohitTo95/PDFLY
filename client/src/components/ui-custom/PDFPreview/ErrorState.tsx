
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  error: string;
  className?: string;
}

export const ErrorState = ({ error, className }: ErrorStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 border border-dashed rounded-xl border-destructive/50 bg-destructive/5",
      className
    )}>
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <p className="text-destructive font-medium">Error</p>
      <p className="text-sm text-muted-foreground text-center mt-2">{error}</p>
    </div>
  );
};
