import { CalendarIcon, User2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface Article {
  id: string; // Changed from number to string to match Supabase
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface ArticleCardProps {
  article: Article;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800';

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-gray-200 h-full flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img
          src={imageError ? DEFAULT_IMAGE : (article.imageUrl || DEFAULT_IMAGE)}
          alt={article.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageError ? 'opacity-0' : 'opacity-100'}`}
          onError={() => setImageError(true)}
        />
        <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-genexel-700 hover:bg-white">
          {article.category}
        </Badge>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User2 className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-analytics-900 group-hover:text-genexel-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{article.summary}</p>
        
        <Link 
          to={`/articles/${article.slug}`} 
          className="text-genexel-600 font-medium text-sm hover:text-genexel-800 inline-flex items-center group mt-auto"
        >
          Read Article 
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
