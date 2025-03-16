import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/supabase';
import { format } from 'date-fns';
import { CalendarIcon, User2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Article not found');

        setArticle(data);
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Article Not Found</h1>
          <p className="text-gray-600">{error || 'The requested article could not be found.'}</p>
          <Link 
            to="/articles" 
            className="inline-flex items-center text-genexel-600 hover:text-genexel-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="bg-analytics-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/articles" 
            className="inline-flex items-center text-genexel-600 hover:text-genexel-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          
          <h1 className="text-4xl font-bold text-analytics-900 mb-6">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {format(new Date(article.created_at), 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="w-4 h-4" />
              <span>Staff Writer</span>
            </div>
            <Badge className="bg-white/80 backdrop-blur-sm text-genexel-700">
              {article.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {article.thumbnail_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.thumbnail_url} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}
        
        {article.summary && (
          <div className="mb-8 text-lg text-gray-600 border-l-4 border-genexel-200 pl-4">
            {article.summary}
          </div>
        )}
        
        <div className="prose max-w-none">
          {article.content}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 