
import { useState, useEffect } from 'react';
import { Image, Download, AlertTriangle, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUploader from '@/components/ui-custom/FileUploader';
import { imagesToPDF, downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';

const JpgToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [resultPDF, setResultPDF] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setResultPDF(null);
    
    // Generate image previews
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    
    // Clean up previous previews
    imagePreview.forEach(url => URL.revokeObjectURL(url));
    
    setImagePreview(previews);
  };
  
  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: 'No images selected',
        description: 'Please upload at least one image to convert to PDF.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const resultBlob = await imagesToPDF(files);
      setResultPDF(resultBlob);
      
      toast({
        title: 'Images converted successfully',
        description: `${files.length} image(s) have been converted to a PDF.`,
      });
    } catch (error) {
      console.error('Error converting images:', error);
      toast({
        title: 'Error converting images',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (resultPDF) {
      downloadBlob(resultPDF, 'images_to_pdf.pdf');
      
      toast({
        title: 'Download started',
        description: 'Your PDF is being downloaded.',
      });
    }
  };
  
  // Clean up object URLs on component unmount
  useEffect(() => {
    return () => {
      imagePreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Image className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">JPG to PDF Converter</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Convert your JPG images into a professional PDF document. Perfect for creating documents from scanned images or photos.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
            <div className="space-y-8">
              {/* Step 1: Upload Images */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">1</span>
                  Select Images
                </h2>
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                  maxFiles={20}
                  value={files}
                />
              </div>
              
              {/* Step 2: Image Preview and Convert */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">2</span>
                  Convert to PDF
                </h2>
                
                {files.length > 0 ? (
                  <div className="mt-4">
                    {imagePreview.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-3">
                          Preview of your images (order will be maintained in the PDF):
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {imagePreview.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-lg border overflow-hidden bg-muted/20">
                              <img 
                                src={url} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={handleConvert}
                        disabled={loading || files.length === 0}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Converting...</span>
                          </>
                        ) : (
                          <>
                            <Image className="w-5 h-5" />
                            <span>Convert to PDF</span>
                          </>
                        )}
                      </button>
                      
                      {resultPDF && (
                        <button
                          onClick={handleDownload}
                          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-primary hover:bg-primary/10 text-primary transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-lg bg-muted/20">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Please upload images to convert
                    </p>
                  </div>
                )}
              </div>
              
              {/* Tips Section */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Tips for JPG to PDF conversion</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Images will be converted in the order they were uploaded.</li>
                      <li>• Each image will be placed on a separate page in the PDF.</li>
                      <li>• For best results, use high-resolution images (300 DPI or higher).</li>
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

export default JpgToPDF;
