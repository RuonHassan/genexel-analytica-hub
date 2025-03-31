import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Article, getArticles } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";

const RecentArticles = () => {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const recentArticles = articles.slice(0, 3);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || recentArticles.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">No recent articles available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Related Research Articles</h3>
      
      {recentArticles.map((article) => (
        <Link 
          key={article.id} 
          to={`/articles/${article.slug}`}
          className="block transition-all hover:shadow-md rounded-lg"
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-medium text-genexel-800 mb-2 line-clamp-2">
                {article.title}
              </h4>
              
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                <span>
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              
              {article.summary && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {article.summary}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
      
      <div className="text-center pt-2">
        <Link 
          to="/articles"
          className="text-genexel-600 hover:text-genexel-800 text-sm font-medium inline-flex items-center"
        >
          View all articles
          <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default RecentArticles; 