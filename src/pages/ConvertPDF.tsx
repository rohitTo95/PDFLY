
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { FileText, Image, FileUp, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConvertPDF = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Convert PDF</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Convert your files to and from PDF format with our easy-to-use conversion tools.
              Perfect for all your document management needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-card border rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Image className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-2">JPG to PDF</h3>
              <p className="text-muted-foreground mb-4">
                Convert your images into professional PDF documents
              </p>
              <Link to="/jpg-to-pdf" className="mt-auto">
                <Button>
                  <FileUp className="mr-2 h-4 w-4" />
                  Convert Now
                </Button>
              </Link>
            </div>
            
            <div className="bg-card border border-dashed rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">More Conversions</h3>
              <p className="text-muted-foreground mb-4">
                Additional conversion options coming soon
              </p>
              <div className="mt-auto">
                <Button variant="outline" disabled>
                  <FileDown className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-medium mb-4 text-center">Why Use Our PDF Conversion Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <h3 className="font-medium mb-2">Easy to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Simple interface designed for users of all technical levels
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">Fast Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Quick processing to save you time
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are processed securely and never stored
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConvertPDF;
