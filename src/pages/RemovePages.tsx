
import { useState } from 'react';
import { FileInput, Download, FileText, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUploader from '@/components/ui-custom/FileUploader';
import PDFPreview from '@/components/ui-custom/PDFPreview';
import { removePages, downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';

const RemovePages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [resultPDF, setResultPDF] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    // Only take the first file
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setSelectedPages([]);
      setResultPDF(null);
    } else {
      setFile(null);
    }
  };
  
  const handlePageSelect = (pageNumber: number) => {
    setSelectedPages(prev => {
      if (prev.includes(pageNumber)) {
        return prev.filter(p => p !== pageNumber);
      } else {
        return [...prev, pageNumber];
      }
    });
    
    // Reset result when selection changes
    setResultPDF(null);
  };
  
  const handleRemovePages = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a PDF file to remove pages from.',
        variant: 'destructive',
      });
      return;
    }
    
    if (selectedPages.length === 0) {
      toast({
        title: 'No pages selected',
        description: 'Please select at least one page to remove.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const resultBlob = await removePages(file, selectedPages);
      setResultPDF(resultBlob);
      
      toast({
        title: 'Pages removed successfully',
        description: `${selectedPages.length} page(s) have been removed from your PDF.`,
      });
    } catch (error) {
      console.error('Error removing pages:', error);
      toast({
        title: 'Error removing pages',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (resultPDF) {
      const originalName = file?.name || 'document.pdf';
      const fileName = originalName.replace('.pdf', '_edited.pdf');
      downloadBlob(resultPDF, fileName);
      
      toast({
        title: 'Download started',
        description: 'Your edited PDF is being downloaded.',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <FileInput className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Remove PDF Pages</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delete specific pages from your PDF document. Select the pages you want to remove and create a new streamlined document.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
            <div className="space-y-8">
              {/* Step 1: Upload File */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">1</span>
                  Select PDF File
                </h2>
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  value={file ? [file] : []}
                />
              </div>
              
              {/* Step 2: Select Pages to Remove */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">2</span>
                  Select Pages to Remove
                </h2>
                
                {file ? (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-6">
                      Click on the pages you want to remove from your PDF. Selected pages will be highlighted.
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <PDFPreview
                        file={file}
                        showControls={true}
                        selectedPages={selectedPages}
                        onPageSelect={handlePageSelect}
                      />
                      
                      <div className="mt-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">
                            Selected Pages: {selectedPages.length}
                          </span>
                          {selectedPages.length > 0 && (
                            <button
                              onClick={() => setSelectedPages([])}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              Clear Selection
                            </button>
                          )}
                        </div>
                        
                        <button
                          onClick={handleRemovePages}
                          disabled={loading || selectedPages.length === 0}
                          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <FileInput className="w-5 h-5" />
                              <span>Remove Selected Pages</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-lg bg-muted/20">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Please upload a PDF file to remove pages
                    </p>
                  </div>
                )}
              </div>
              
              {/* Step 3: Download Result */}
              {resultPDF && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">3</span>
                    Download Your PDF
                  </h2>
                  
                  <div className="text-center p-6 border rounded-lg bg-muted/10">
                    <p className="text-sm text-muted-foreground mb-4">
                      Your PDF has been processed. {selectedPages.length} page(s) have been removed.
                    </p>
                    
                    <button
                      onClick={handleDownload}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Edited PDF</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Tips Section */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Tips for removing pages</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Navigate through your PDF and click on pages you want to remove.</li>
                      <li>• The original file remains unchanged - a new PDF will be created without the selected pages.</li>
                      <li>• All processing happens in your browser - your files are not uploaded to any server.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RemovePages;
