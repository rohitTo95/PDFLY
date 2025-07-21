import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Scissors, 
  Layers, 
  Trash2, 
  Download, 
  Image, 
  Minimize2,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();

  const tools = [
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one',
      icon: Layers,
      path: '/merge-pdf',
      color: 'text-blue-600'
    },
    {
      title: 'Split PDF',
      description: 'Split a PDF into multiple files',
      icon: Scissors,
      path: '/split-pdf',
      color: 'text-green-600'
    },
    {
      title: 'Remove Pages',
      description: 'Remove specific pages from a PDF',
      icon: Trash2,
      path: '/remove-pages',
      color: 'text-red-600'
    },
    {
      title: 'Extract Pages',
      description: 'Extract specific pages to a new PDF',
      icon: Download,
      path: '/extract-pages',
      color: 'text-purple-600'
    },
    {
      title: 'JPG to PDF',
      description: 'Convert JPG images to PDF',
      icon: Image,
      path: '/jpg-to-pdf',
      color: 'text-orange-600'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size',
      icon: Minimize2,
      path: '/compress-pdf',
      color: 'text-indigo-600'
    },
    {
      title: 'Convert PDF',
      description: 'Convert PDF to other formats',
      icon: RefreshCw,
      path: '/convert-pdf',
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.username || 'User'}!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our powerful PDF tools to get started with your document processing.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card 
                key={tool.path} 
                className="hover:shadow-lg transition-shadow duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </CardDescription>
                  <Link to={tool.path}>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Section (Placeholder) */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Most Used Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link to="/merge-pdf" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="font-medium">Merge PDF</div>
                      <div className="text-sm text-muted-foreground">Combine multiple PDFs</div>
                    </Link>
                    <Link to="/split-pdf" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="font-medium">Split PDF</div>
                      <div className="text-sm text-muted-foreground">Split PDF into pages</div>
                    </Link>
                    <Link to="/jpg-to-pdf" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="font-medium">JPG to PDF</div>
                      <div className="text-sm text-muted-foreground">Convert images to PDF</div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips & Tricks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-sm">Batch Processing</div>
                      <div className="text-xs text-muted-foreground">
                        You can upload multiple files at once for most operations.
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-sm">File Privacy</div>
                      <div className="text-xs text-muted-foreground">
                        All processing happens in your browser - files never leave your device.
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-sm">File Size Limits</div>
                      <div className="text-xs text-muted-foreground">
                        For best performance, keep individual files under 50MB.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
