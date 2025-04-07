
import { useState, useEffect } from 'react';
import { PDFDocumentWrapper } from './PDFDocumentWrapper';
import { PDFControls } from './PDFControls';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { cn } from '@/lib/utils';

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
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };
  
  const onDocumentLoadError = (error: Error) => {
    setError('Failed to load PDF: ' + error.message);
    setLoading(false);
  };
  
  const prevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };
  
  const nextPage = () => {
    if (numPages) {
      setPageNumber(prev => Math.min(prev + 1, numPages));
    }
  };
  
  const handlePageClick = () => {
    if (onPageSelect && pageNumber) {
      onPageSelect(pageNumber);
    }
  };
  
  const isPageSelected = selectedPages?.includes(pageNumber);
  
  if (!fileUrl) {
    return <EmptyState className={className} />;
  }
  
  if (error) {
    return <ErrorState error={error} className={className} />;
  }
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <PDFDocumentWrapper
        fileUrl={fileUrl}
        pageNumber={pageNumber}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        onDocumentLoadError={onDocumentLoadError}
        loading={loading}
        isPageSelected={isPageSelected}
        selectedPages={selectedPages}
        onPageClick={onPageSelect ? handlePageClick : undefined}
      />
      
      {showControls && numPages && numPages > 0 && (
        <PDFControls
          pageNumber={pageNumber}
          numPages={numPages}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          showDelete={showDelete}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default PDFPreview;
