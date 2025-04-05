import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Trash2, File, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Setup PDF.js worker with a reliable CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf_viewer.min.css`;

interface PDFPreviewProps {
  file: File | null;
  showControls?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  className?: string;
  selectedPages?: number[];
  onPageSelect?: (pageNumber: number) => void;
}

const PDFPreview = ({
  file,
  showControls = true,
  showDelete = false,
  onDelete,
  className,
  selectedPages = [],
  onPageSelect
}: PDFPreviewProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  // Create and manage file URL
  useEffect(() => {
    if (file) {
      setLoading(true);
      setError(null);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [file]);
  
  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };
  
  // Handle document load error
  const onDocumentLoadError = (error: Error) => {
    setError('Failed to load PDF: ' + error.message);
    setLoading(false);
  };
  
  // Navigate to previous page
  const prevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };
  
  // Navigate to next page
  const nextPage = () => {
    if (numPages) {
      setPageNumber(prev => Math.min(prev + 1, numPages));
    }
  };
  
  // Handle page click for selection
  const handlePageClick = () => {
    if (onPageSelect && pageNumber) {
      onPageSelect(pageNumber);
    }
  };
  
  // Check if current page is selected
  const isPageSelected = selectedPages?.includes(pageNumber);
  
  if (!fileUrl) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-8 border border-dashed rounded-xl border-border bg-muted/20",
        className
      )}>
        <File className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No PDF file selected</p>
      </div>
    );
  }
  
  if (error) {
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
  }
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* PDF Document */}
      <div 
        className={cn(
          "relative border rounded-xl overflow-hidden",
          onPageSelect && "cursor-pointer hover:border-primary transition-colors",
          isPageSelected && "ring-2 ring-primary"
        )}
        onClick={handlePageClick}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center w-full min-h-[300px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
              width={320}
            />
          )}
        </Document>
        
        {/* Page selection indicator */}
        {onPageSelect && isPageSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
            {selectedPages.indexOf(pageNumber) + 1}
          </div>
        )}
      </div>
      
      {/* Controls */}
      {showControls && numPages && numPages > 0 && (
        <div className="flex items-center justify-between mt-4 w-full">
          <div className="flex items-center space-x-1">
            <button
              onClick={prevPage}
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
              onClick={nextPage}
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
      )}
    </div>
  );
};

export default PDFPreview;
