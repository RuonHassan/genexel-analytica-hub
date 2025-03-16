import { useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/lib/supabase";

interface ArticlesGridProps {
  articles: Article[];
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
}

const ArticlesGrid = ({
  articles,
  currentPage,
  isLoading,
  error,
}: ArticlesGridProps) => {
  
  // Format article data for ArticleCard component
  const formatArticleForCard = (article: Article) => {
    return {
      id: article.id,
      title: article.title,
      summary: article.summary || "",
      date: new Date(article.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Staff Writer", // Default author since we don't have this in DB yet
      category: article.category,
      imageUrl: article.thumbnail_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      slug: article.slug || article.id,
    };
  };

  // Animation sequence on page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.fade-in-item').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
        }, i * 100);
      });
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading articles. Please try again.</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <div 
          key={article.id} 
          className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
          style={{ transitionDelay: `${300 + index * 100}ms` }}
        >
          <ArticleCard article={formatArticleForCard(article)} />
        </div>
      ))}
    </div>
  );
};

export default ArticlesGrid;
