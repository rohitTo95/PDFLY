
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileDown, File, Gauge } from 'lucide-react';

const CompressPDF = () => {
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
          
          {/* Coming Soon Section */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-card border rounded-lg p-8 shadow-sm max-w-lg w-full text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Gauge className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                We're currently working on this feature to provide you with the best PDF compression tool.
                Check back soon!
              </p>
              <div className="flex justify-center space-x-2">
                <div className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-1" />
                  <span>Upload PDF</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center text-sm">
                  <Gauge className="h-4 w-4 mr-1" />
                  <span>Compress</span>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex items-center text-sm">
                  <FileDown className="h-4 w-4 mr-1" />
                  <span>Download</span>
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

export default CompressPDF;
