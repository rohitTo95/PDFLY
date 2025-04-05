import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileDown, File, Gauge, Upload, Download } from 'lucide-react';
import FileUploader from '@/components/ui-custom/FileUploader';
import PDFPreview from '@/components/ui-custom/PDFPreview';
import { compressPDF, downloadBlob } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedPDF, setCompressedPDF] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState<boolean>(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setOriginalSize(selectedFiles[0].size);
      setCompressedPDF(null);
      setCompressedSize(0);
    } else {
      setFile(null);
      setOriginalSize(0);
    }
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
      
      // Actually compress the PDF using our utility
      const result = await compressPDF(file, compressionLevel);
      const newSize = result.size;
      
      setCompressedPDF(result);
      setCompressedSize(newSize);
      
      const reductionPercent = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      
      toast({
        title: 'PDF compressed successfully',
        description: `Reduced from ${(originalSize / 1024).toFixed(1)} KB to ${(newSize / 1024).toFixed(1)} KB (${reductionPercent}% reduction)`,
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
                        <p className="mb-2"><strong>Original size:</strong> {file ? `${(originalSize / 1024).toFixed(1)} KB` : 'Unknown'}</p>
                        {compressedPDF && (
                          <p className="mb-2"><strong>Compressed size:</strong> {`${(compressedSize / 1024).toFixed(1)} KB`} 
                            <span className="text-green-500 ml-2">
                              ({((originalSize - compressedSize) / originalSize * 100).toFixed(1)}% reduction)
                            </span>
                          </p>
                        )}
                        
                        <div className="space-y-2 text-xs mt-4">
                          <p>• Low compression: Minimal quality loss, ~10-20% reduction</p>
                          <p>• Medium compression: Balanced approach, ~20-40% reduction</p>
                          <p>• High compression: Maximum compression, ~40-60% reduction</p>
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
