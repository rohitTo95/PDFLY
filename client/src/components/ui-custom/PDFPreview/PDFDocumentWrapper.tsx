
import { Document, Page, pdfjs } from 'react-pdf';
import { cn } from '@/lib/utils';

// Fallback worker configuration
if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs';
}

interface PDFDocumentWrapperProps {
  fileUrl: string;
  pageNumber: number;
  onDocumentLoadSuccess: (data: { numPages: number }) => void;
  onDocumentLoadError: (error: Error) => void;
  loading: boolean;
  isPageSelected?: boolean;
  selectedPages?: number[];
  onPageClick?: () => void;
  className?: string;
}

export const PDFDocumentWrapper = ({
  fileUrl,
  pageNumber,
  onDocumentLoadSuccess,
  onDocumentLoadError,
  loading,
  isPageSelected,
  selectedPages,
  onPageClick,
  className
}: PDFDocumentWrapperProps) => {
  return (
    <div 
      className={cn(
        "relative border rounded-xl overflow-hidden",
        onPageClick && "cursor-pointer hover:border-primary transition-colors",
        isPageSelected && "ring-2 ring-primary",
        className
      )}
      onClick={onPageClick}
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
      
      {onPageClick && isPageSelected && selectedPages && (
        <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
          {selectedPages.indexOf(pageNumber) + 1}
        </div>
      )}
    </div>
  );
};
