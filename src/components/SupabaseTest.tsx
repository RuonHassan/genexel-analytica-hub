import { useState, useEffect } from 'react';
import { supabase, getArticles, getReports } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const SupabaseTest = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [articlesStatus, setArticlesStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [reportsStatus, setReportsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [reportCount, setReportCount] = useState<number | null>(null);

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('loading');
    setErrorMessage(null);
    
    try {
      const { data, error } = await supabase.from('articles').select('count');
      
      if (error) {
        throw error;
      }
      
      setConnectionStatus('success');
    } catch (error: any) {
      console.error('Error testing connection:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'An unknown error occurred');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const fetchArticles = async () => {
    setArticlesStatus('loading');
    setArticleCount(null);
    
    try {
      const data = await getArticles();
      setArticleCount(data?.length || 0);
      setArticlesStatus('success');
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticlesStatus('error');
    }
  };

  const fetchReports = async () => {
    setReportsStatus('loading');
    setReportCount(null);
    
    try {
      const data = await getReports();
      setReportCount(data?.length || 0);
      setReportsStatus('success');
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReportsStatus('error');
    }
  };

  // Check environment variables
  const supabaseUrl = 
    process.env.REACT_APP_SUPABASE_URL || 
    import.meta.env?.VITE_SUPABASE_URL;
  
  const supabaseAnonKey = 
    process.env.REACT_APP_SUPABASE_ANON_KEY || 
    import.meta.env?.VITE_SUPABASE_ANON_KEY;
  
  const hasEnvVars = !!supabaseUrl && !!supabaseAnonKey;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-md font-medium mb-2">Environment Variables</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-medium">Supabase URL:</div>
          <div className="font-mono">
            {supabaseUrl ? 
              supabaseUrl.substring(0, 10) + '...' : 
              <span className="text-red-500">Not set</span>
            }
          </div>
          <div className="font-medium">Supabase Anon Key:</div>
          <div className="font-mono">
            {supabaseAnonKey ? 
              supabaseAnonKey.substring(0, 10) + '...' : 
              <span className="text-red-500">Not set</span>
            }
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Button 
            onClick={testConnection} 
            disabled={isTestingConnection || !hasEnvVars}
            className="mr-4"
          >
            {connectionStatus === 'loading' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Test Connection
          </Button>
          
          {connectionStatus === 'success' && (
            <span className="inline-flex items-center text-green-600">
              <CheckCircle2 className="mr-1 h-4 w-4" /> Connected
            </span>
          )}
          
          {connectionStatus === 'error' && (
            <span className="inline-flex items-center text-red-600">
              <AlertCircle className="mr-1 h-4 w-4" /> Error
            </span>
          )}
          
          {errorMessage && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
              {errorMessage}
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <Button 
            onClick={fetchArticles} 
            disabled={articlesStatus === 'loading' || !hasEnvVars}
            className="mr-4 mb-2"
            variant="outline"
          >
            {articlesStatus === 'loading' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Fetch Articles
          </Button>
          
          {articleCount !== null && (
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">
              {articleCount} articles
            </span>
          )}
          
          {articlesStatus === 'error' && (
            <span className="inline-flex items-center ml-2 text-red-600 text-sm">
              <AlertCircle className="mr-1 h-4 w-4" /> Error fetching articles
            </span>
          )}
        </div>
        
        <div className="border-t pt-4">
          <Button 
            onClick={fetchReports} 
            disabled={reportsStatus === 'loading' || !hasEnvVars}
            className="mr-4 mb-2"
            variant="outline"
          >
            {reportsStatus === 'loading' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Fetch Reports
          </Button>
          
          {reportCount !== null && (
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">
              {reportCount} reports
            </span>
          )}
          
          {reportsStatus === 'error' && (
            <span className="inline-flex items-center ml-2 text-red-600 text-sm">
              <AlertCircle className="mr-1 h-4 w-4" /> Error fetching reports
            </span>
          )}
        </div>
      </div>
      
      {(!supabaseUrl || !supabaseAnonKey) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
          <h3 className="text-md font-medium mb-2">Missing Environment Variables</h3>
          <p className="text-sm mb-2">Please ensure your Supabase environment variables are correctly set up:</p>
          <ol className="list-decimal ml-5 text-sm">
            <li>Create a <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code> file in the root of your project</li>
            <li>Add the following lines:
              <pre className="bg-yellow-100 p-2 mt-1 rounded overflow-auto text-xs">
                {/* For Create React App */}
                REACT_APP_SUPABASE_URL=your_supabase_url<br/>
                REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
                
                {/* For Vite */}
                VITE_SUPABASE_URL=your_supabase_url<br/>
                VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
              </pre>
            </li>
            <li>Restart your development server</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default SupabaseTest; 