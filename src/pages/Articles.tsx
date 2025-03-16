
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Article, getArticles } from "@/lib/supabase";
import Footer from "@/components/Footer";
import UploadModal from "@/components/UploadModal";
import ArticlesHero from "@/components/ArticlesHero";
import ArticlesGrid from "@/components/ArticlesGrid";
import ArticlesPagination from "@/components/ArticlesPagination";

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

  // Apply filters to articles
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

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 pb-16">
        {/* Hero Banner */}
        <ArticlesHero 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          openUploadModal={() => setIsUploadModalOpen(true)}
        />
        
        {/* Articles list */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <ArticlesGrid 
            articles={currentArticles}
            currentPage={currentPage}
            isLoading={isLoading}
            error={error as Error}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            resetFilters={resetFilters}
          />
          
          {/* Pagination */}
          <ArticlesPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
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
