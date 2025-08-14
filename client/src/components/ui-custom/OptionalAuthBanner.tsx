import { Info, LogIn, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const OptionalAuthBanner = () => {
  const { isAuthenticated, user } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Don't show banner if user is authenticated or has dismissed it
  if (isAuthenticated || dismissed) {
    return null;
  }

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Want to save your work?</strong> Create a free account to access your processing history, save preferences, and get priority support.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/signup">
            <Button size="sm" variant="default" className="text-xs">
              <UserPlus className="h-3 w-3 mr-1" />
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" variant="outline" className="text-xs">
              <LogIn className="h-3 w-3 mr-1" />
              Login
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDismissed(true)}
            className="text-xs p-1 h-8 w-8"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default OptionalAuthBanner;
