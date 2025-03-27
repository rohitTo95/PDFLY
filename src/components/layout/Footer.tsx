
import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 bg-muted/50 dark:bg-muted/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="text-lg font-medium">PDF Tools</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Powerful PDF tools for all your document needs. Edit, convert, and manage PDFs with ease.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/merge-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/split-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/remove-pages" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Remove Pages
                </Link>
              </li>
              <li>
                <Link to="/extract-pages" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Extract Pages
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Convert</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jpg-to-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground opacity-50">
                  Word to PDF (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground opacity-50">
                  PowerPoint to PDF (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground opacity-50">
                  Excel to PDF (Coming Soon)
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col items-center justify-center space-y-2 md:flex-row md:justify-between md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PDF Tools. All rights reserved.
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            Made with <Heart size={14} className="mx-1 text-destructive" /> for quality document management
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
