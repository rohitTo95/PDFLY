import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EmailVerification = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Check Your Email</h1>
            <p className="text-muted-foreground mt-2">
              We've sent you a verification link
            </p>
          </div>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Account Created Successfully
              </CardTitle>
              <CardDescription className="text-left mt-4">
                A verification email has been sent to your account. Please verify to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Next steps:</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here to log in</li>
                </ol>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  If you have already verified your email, you can log in now.
                </p>
                
                <Button asChild className="w-full">
                  <Link to="/login" className="flex items-center justify-center gap-2">
                    Login Here
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{' '}
                  <Link to="/signup" className="text-primary hover:underline">
                    try signing up again
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmailVerification;
