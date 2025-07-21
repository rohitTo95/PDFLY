
import { File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  className?: string;
}

export const EmptyState = ({ className }: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 border border-dashed rounded-xl border-border bg-muted/20",
      className
    )}>
      <File className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground">No PDF file selected</p>
    </div>
  );
};
