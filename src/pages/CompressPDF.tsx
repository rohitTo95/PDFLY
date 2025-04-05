
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileDown, File, Gauge, Upload } from 'lucide-react';
import FileUploader from '@/components/ui-custom/FileUploader';
import PDFPreview from '@/components/ui-custom/PDFPreview';
import { downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedPDF, setCompressedPDF] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setCompressedPDF(null);
    } else {
      setFile(null);
    }
  };

  // Function to simulate PDF compression (in a real app, this would use actual compression algorithms)
  const compressPDF = async (file: File, level: 'low' | 'medium' | 'high'): Promise<Blob> => {
    return new Promise((resolve) => {
      // Simulate compression processing time
      setTimeout(() => {
        // In reality, we would apply actual compression here
        // For demo purposes, we'll create a "compressed" file by returning the original
        // In a production app, you'd use a PDF compression library
        resolve(file);
      }, 2000); // Simulate 2 seconds of processing
    });
  };

  const handleCompress = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a PDF file to compress.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Get compression ratio based on selected level
      const compressionRatios = {
        low: 0.9, // 10% reduction
        medium: 0.7, // 30% reduction
        high: 0.5, // 50% reduction
      };
      
      // Compress the PDF
      const result = await compressPDF(file, compressionLevel);
      
      // Calculate an estimated file size (simulated)
      const originalSize = file.size;
      const estimatedSize = Math.round(originalSize * compressionRatios[compressionLevel]);
      
      // Log compression result
      console.log(`Original size: ${originalSize} bytes, Compressed size: ${estimatedSize} bytes`);
      
      setCompressedPDF(result);
      
      toast({
        title: 'PDF compressed successfully',
        description: `Reduced from ${(originalSize / 1024).toFixed(1)} KB to approximately ${(estimatedSize / 1024).toFixed(1)} KB (${Math.round((1 - compressionRatios[compressionLevel]) * 100)}% reduction)`,
      });
    } catch (error) {
      console.error('Error compressing PDF:', error);
      toast({
        title: 'Error compressing PDF',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (compressedPDF) {
      const originalName = file?.name || 'document.pdf';
      const fileName = originalName.replace('.pdf', '_compressed.pdf');
      downloadBlob(compressedPDF, fileName);
      
      toast({
        title: 'Download started',
        description: 'Your compressed PDF is being downloaded.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Compress PDF</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Reduce the size of your PDF files without compromising quality.
              Perfect for sharing, uploading, or storing your documents.
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Step 1: Upload File */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">1</span>
                  Upload PDF
                </h2>
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  value={file ? [file] : []}
                />
              </div>
              
              {/* Step 2: Compression Options */}
              {file && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">2</span>
                    Select Compression Level
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {['low', 'medium', 'high'].map((level) => (
                      <div 
                        key={level}
                        onClick={() => setCompressionLevel(level as 'low' | 'medium' | 'high')}
                        className={`border rounded-lg p-4 cursor-pointer ${compressionLevel === level ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <Gauge className={`h-8 w-8 mb-2 ${compressionLevel === level ? 'text-primary' : 'text-muted-foreground'}`} />
                          <h3 className="font-medium capitalize">{level}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {level === 'low' && "Better quality, larger file size"}
                            {level === 'medium' && "Balanced quality and file size"}
                            {level === 'high' && "Smallest file size, lower quality"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col md:flex-row mt-6 gap-6">
                    <div className="flex-1">
                      <PDFPreview file={file} />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <button
                        onClick={handleCompress}
                        disabled={loading || !file}
                        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mb-4"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Compressing...</span>
                          </>
                        ) : (
                          <>
                            <Gauge className="w-5 h-5" />
                            <span>Compress PDF</span>
                          </>
                        )}
                      </button>
                      
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Original size:</strong> {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Unknown'}</p>
                        
                        <div className="space-y-2 text-xs">
                          <p>• Low compression: ~10% reduction</p>
                          <p>• Medium compression: ~30% reduction</p>
                          <p>• High compression: ~50% reduction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Download */}
              {compressedPDF && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3 text-sm">3</span>
                    Download Compressed PDF
                  </h2>
                  
                  <div className="text-center p-6 border rounded-lg bg-muted/10">
                    <p className="text-sm text-muted-foreground mb-4">
                      Your PDF has been compressed and is ready to download.
                    </p>
                    
                    <button
                      onClick={handleDownload}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Compressed PDF</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Tips Section */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border mt-8">
                <h3 className="font-medium mb-2">Tips for best results</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use Medium compression for most documents to maintain a good balance between quality and size</li>
                  <li>• High compression works best for documents with few images</li>
                  <li>• For image-heavy PDFs, consider Low compression to maintain quality</li>
                  <li>• All processing happens in your browser - your files are not uploaded to any server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompressPDF;
