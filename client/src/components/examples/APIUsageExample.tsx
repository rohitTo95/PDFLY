// Example usage of the new API service
// This demonstrates how to use authenticated and public API calls

import React, { useState } from 'react';
import { useAPI } from '@/hooks/useAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Lock, Unlock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const APIUsageExample: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<'valid' | 'invalid' | 'unknown'>('unknown');
  
  const { authenticated, public: publicAPI, verifyToken, checkTokenValidity } = useAPI();

  // Example: Make an authenticated API call
  const handleAuthenticatedCall = async () => {
    setLoading(true);
    try {
      // This will automatically verify the token before making the request
      const response = await authenticated.get('/user-profile');
      setResponse(JSON.stringify(response.data, null, 2));
      
      toast({
        title: 'Success',
        description: 'Authenticated API call completed successfully'
      });
    } catch (error) {
      console.error('Authenticated API Error:', error);
      setResponse('Error: ' + (error as Error).message);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to make authenticated API call'
      });
    } finally {
      setLoading(false);
    }
  };

  // Example: Make a public API call
  const handlePublicCall = async () => {
    setLoading(true);
    try {
      const response = await publicAPI.get('/public-info');
      setResponse(JSON.stringify(response.data, null, 2));
      
      toast({
        title: 'Success',
        description: 'Public API call completed successfully'
      });
    } catch (error) {
      console.error('Public API Error:', error);
      setResponse('Error: ' + (error as Error).message);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to make public API call'
      });
    } finally {
      setLoading(false);
    }
  };

  // Example: Check token validity manually
  const handleTokenCheck = async () => {
    setLoading(true);
    try {
      const isValid = await checkTokenValidity();
      setTokenStatus(isValid ? 'valid' : 'invalid');
      
      toast({
        title: isValid ? 'Token Valid' : 'Token Invalid',
        description: isValid ? 'Your session is active' : 'Your session has expired',
        variant: isValid ? 'default' : 'destructive'
      });
    } catch (error) {
      console.error('Token check error:', error);
      setTokenStatus('invalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Usage Examples</CardTitle>
          <CardDescription>
            Examples of how to use the new authentication system and API calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleAuthenticatedCall} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Loading...' : 'Authenticated API Call'}
            </Button>
            
            <Button 
              onClick={handlePublicCall} 
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Public API Call
            </Button>
            
            <Button 
              onClick={handleTokenCheck} 
              disabled={loading}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Check Token
            </Button>
          </div>

          {tokenStatus !== 'unknown' && (
            <div className="flex items-center gap-2">
              <span>Token Status:</span>
              <Badge 
                variant={tokenStatus === 'valid' ? 'default' : 'destructive'}
                className="flex items-center gap-1"
              >
                {tokenStatus === 'valid' ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertCircle className="w-3 h-3" />
                )}
                {tokenStatus}
              </Badge>
            </div>
          )}

          {response && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Response:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                {response}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Automatic token verification before each authenticated request
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Automatic logout when token expires or becomes invalid
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Periodic token validation every 5 minutes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Separate authenticated and public API methods
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Token stored securely in HTTP-only cookies
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
