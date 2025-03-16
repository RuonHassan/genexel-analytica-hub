
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilePlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import UploadModal from "@/components/UploadModal";
import { useQuery } from "@tanstack/react-query";
import { Article, getArticles } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Fetch articles using React Query
  const { data: allArticles = [], isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  // Apply filters and pagination to articles
  const getFilteredArticles = () => {
    let filtered = [...allArticles];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          (article.summary && article.summary.toLowerCase().includes(search)) ||
          article.category.toLowerCase().includes(search)
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(
        (article) => article.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    return filtered;
  };

  const filteredArticles = getFilteredArticles();
  
  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Get unique categories from the articles
  const categories = [...new Set(allArticles.map(article => article.category))];

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
      imageUrl: article.image_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 pb-16">
        {/* Hero Banner */}
        <div className="bg-analytics-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-analytics-900 mb-6 transition-all duration-700 opacity-0 translate-y-8 fade-in-item">
              Latest Articles & Insights
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-100 opacity-0 translate-y-8 fade-in-item">
              Discover cutting-edge research and analysis from our experts in higher education data analytics.
            </p>
            
            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto transition-all duration-700 delay-200 opacity-0 translate-y-8 fade-in-item">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-genexel-600 hover:bg-genexel-700 text-white md:w-auto"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
        </div>
        
        {/* Articles list */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">Error loading articles. Please try again.</p>
            </div>
          ) : currentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <ArticleCard article={formatArticleForCard(article)} />
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                }}
                className="mt-2 text-genexel-600"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <UploadModal 
        open={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        type="article"
      />
    </div>
  );
};

export default Articles;
