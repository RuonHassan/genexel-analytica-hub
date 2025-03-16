import React, { useEffect, useState } from 'react';
import { supabase, getArticles } from '@/lib/supabase';

const ArticleTest = () => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSupabase() {
      setStatus('Testing Supabase connection...');
      
      try {
        // Test basic connection
        const { data, error: pingError } = await supabase.from('articles').select('count');
        
        if (pingError) {
          setStatus('Connection error');
          setError(`Failed to connect to Supabase: ${pingError.message}`);
          return;
        }
        
        setStatus('Connection successful, fetching articles...');
        
        // Try to fetch articles
        try {
          const articlesData = await getArticles();
          setArticles(articlesData || []);
          setStatus(`Successfully fetched ${articlesData?.length || 0} articles`);
        } catch (fetchError: any) {
          setStatus('Error fetching articles');
          setError(`Error fetching articles: ${fetchError.message}`);
        }
      } catch (e: any) {
        setStatus('Unexpected error');
        setError(`Unexpected error: ${e.message}`);
      }
    }
    
    testSupabase();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Supabase Connectivity Test</h1>
      
      <div className="mb-6 p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-2">Connection Status</h2>
        <div className={`p-3 rounded-md ${error ? 'bg-red-100' : 'bg-green-100'}`}>
          <p className="font-medium">{status}</p>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
      
      {articles.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Articles Retrieved ({articles.length})</h2>
          <ul className="border rounded-md divide-y">
            {articles.map(article => (
              <li key={article.id} className="p-3">
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-gray-500">Category: {article.category}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="p-4 border rounded-md bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
        <p className="mb-2">
          <span className="font-medium">VITE_SUPABASE_URL:</span> {' '}
          {import.meta.env.VITE_SUPABASE_URL ? 
            `${import.meta.env.VITE_SUPABASE_URL.substring(0, 10)}...` : 
            'Not defined'}
        </p>
        <p>
          <span className="font-medium">VITE_SUPABASE_ANON_KEY:</span> {' '}
          {import.meta.env.VITE_SUPABASE_ANON_KEY ? 
            `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 10)}...` : 
            'Not defined'}
        </p>
      </div>
    </div>
  );
};

export default ArticleTest; 