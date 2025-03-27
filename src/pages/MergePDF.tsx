
import { useState } from 'react';
import { Merge, Download, Upload, FileText, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUploader from '@/components/ui-custom/FileUploader';
import { mergePDFs, downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPDF, setMergedPDF] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    // Reset merged PDF when new files are selected
    setMergedPDF(null);
  };
  
  const handleMergePDFs = async () => {
    if (files.length < 2) {
      toast({
        title: 'Not enough files',
        description: 'You need to upload at least 2 PDF files to merge.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const mergedBlob = await mergePDFs(files);
      setMergedPDF(mergedBlob);
      toast({
        title: 'PDFs merged successfully',
        description: 'Your PDF files have been combined into a single document.',
      });
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast({
        title: 'Error merging PDFs',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (mergedPDF) {
      downloadBlob(mergedPDF, 'merged.pdf');
      toast({
        title: 'Download started',
        description: 'Your merged PDF is being downloaded.',
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
              <Merge className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Merge PDF Files</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine multiple PDF documents into a single file. Arrange them in any order and create one unified PDF.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
            <div className="space-y-8">
              {/* Step 1: Upload Files */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">1</span>
                  Select PDF Files
                </h2>
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={20}
                  value={files}
                />
              </div>
              
              {/* Step 2: Merge Files */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">2</span>
                  Merge Files
                </h2>
                
                {files.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {files.length === 1 
                        ? "You've added 1 PDF file. Please add at least one more file to merge." 
                        : `You've added ${files.length} PDF files. Click the button below to merge them.`}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={handleMergePDFs}
                        disabled={loading || files.length < 2}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Merging...</span>
                          </>
                        ) : (
                          <>
                            <Merge className="w-5 h-5" />
                            <span>Merge PDFs</span>
                          </>
                        )}
                      </button>
                      
                      {mergedPDF && (
                        <button
                          onClick={handleDownload}
                          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-primary hover:bg-primary/10 text-primary transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download Merged PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-lg bg-muted/20">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Please upload PDF files to merge
                    </p>
                  </div>
                )}
              </div>
              
              {/* Tips Section */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Tips for merging PDFs</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Upload files in the order you want them to appear in the final document.</li>
                      <li>• You can rearrange files by removing them and uploading them again in the desired order.</li>
                      <li>• For large files, the merging process may take a few moments.</li>
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

export default MergePDF;
