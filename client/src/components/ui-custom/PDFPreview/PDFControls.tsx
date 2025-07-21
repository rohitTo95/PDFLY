
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFControlsProps {
  pageNumber: number;
  numPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
}

export const PDFControls = ({
  pageNumber,
  numPages,
  onPrevPage,
  onNextPage,
  showDelete = false,
  onDelete
}: PDFControlsProps) => {
  return (
    <div className="flex items-center justify-between mt-4 w-full">
      <div className="flex items-center space-x-1">
        <button
          onClick={onPrevPage}
          disabled={pageNumber <= 1}
          className={cn(
            "p-1 rounded-full transition-colors",
            pageNumber <= 1 
              ? "text-muted-foreground opacity-50 cursor-not-allowed" 
              : "hover:bg-muted/50 text-foreground hover:text-primary"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <span className="text-sm">
          {pageNumber} / {numPages}
        </span>
        
        <button
          onClick={onNextPage}
          disabled={pageNumber >= numPages}
          className={cn(
            "p-1 rounded-full transition-colors",
            pageNumber >= numPages 
              ? "text-muted-foreground opacity-50 cursor-not-allowed" 
              : "hover:bg-muted/50 text-foreground hover:text-primary"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Delete file"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
