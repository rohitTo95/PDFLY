
import { useState } from 'react';
import { Scissors, Download, FileText, AlertTriangle, ChevronDown, File } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUploader from '@/components/ui-custom/FileUploader';
import { splitPDF, downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';
import PDFPreview from '@/components/ui-custom/PDFPreview';

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitPDFs, setSplitPDFs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    // Only take the first file
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setSplitPDFs([]);
      setShowResults(false);
    } else {
      setFile(null);
    }
  };
  
  const handleSplitPDF = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a PDF file to split.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const splitBlobs = await splitPDF(file);
      setSplitPDFs(splitBlobs);
      setShowResults(true);
      
      toast({
        title: 'PDF split successfully',
        description: `Your PDF has been split into ${splitBlobs.length} individual pages.`,
      });
    } catch (error) {
      console.error('Error splitting PDF:', error);
      toast({
        title: 'Error splitting PDF',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = (index: number) => {
    if (splitPDFs[index]) {
      downloadBlob(splitPDFs[index], `page_${index + 1}.pdf`);
      toast({
        title: 'Download started',
        description: `Page ${index + 1} is being downloaded.`,
      });
    }
  };
  
  const handleDownloadAll = () => {
    if (splitPDFs.length === 0) return;
    
    // Create a zip of all PDFs using JSZip (simplified for this example)
    // In a real implementation, you would use JSZip or similar library
    splitPDFs.forEach((blob, index) => {
      setTimeout(() => {
        downloadBlob(blob, `page_${index + 1}.pdf`);
      }, index * 300); // Download files with a slight delay between each
    });
    
    toast({
      title: 'Download started',
      description: `All ${splitPDFs.length} pages will be downloaded individually.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Scissors className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Split PDF</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Separate a PDF into individual pages. Perfect for extracting specific content or breaking down large documents.
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
              
              {/* Step 2: Preview and Split */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">2</span>
                  Preview and Split PDF
                </h2>
                
                {file ? (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row items-start gap-8">
                      <div className="w-full sm:w-auto mx-auto">
                        <PDFPreview file={file} showControls={true} />
                      </div>
                      
                      <div className="flex-1 mt-6 sm:mt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Your PDF will be split into individual pages. Each page will become a separate PDF file.
                        </p>
                        
                        <button
                          onClick={handleSplitPDF}
                          disabled={loading || !file}
                          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                              <span>Splitting...</span>
                            </>
                          ) : (
                            <>
                              <Scissors className="w-5 h-5" />
                              <span>Split PDF</span>
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
                      Please upload a PDF file to split
                    </p>
                  </div>
                )}
              </div>
              
              {/* Step 3: Results */}
              {showResults && splitPDFs.length > 0 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">3</span>
                    Download Split PDF Pages
                  </h2>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Your PDF has been split into {splitPDFs.length} individual pages.
                    </p>
                    
                    <button
                      onClick={handleDownloadAll}
                      className="text-sm px-4 py-2 rounded-lg border border-primary hover:bg-primary/10 text-primary transition-colors flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download All</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {splitPDFs.map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-card/50 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <File className="h-5 w-5 text-primary" />
                            <span className="font-medium">Page {index + 1}</span>
                          </div>
                          <button
                            onClick={() => handleDownload(index)}
                            className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
                            aria-label={`Download page ${index + 1}`}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tips Section */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Tips for splitting PDFs</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• This tool splits your PDF into individual pages (one PDF per page).</li>
                      <li>• For extracting specific pages only, use our "Extract Pages" tool.</li>
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

export default SplitPDF;
