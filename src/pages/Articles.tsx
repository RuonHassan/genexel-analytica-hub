import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Article, getArticles } from "@/lib/supabase";
import ArticlesGrid from "@/components/ArticlesGrid";
import ArticlesPagination from "@/components/ArticlesPagination";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Articles page error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || "An unexpected error occurred in the Articles page"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-genexel-600 hover:bg-genexel-700 text-white rounded-md"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Increased from 6 to 9 for better grid layout

  // Query for articles
  const { 
    data: articles = [], 
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Articles</h2>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Articles Header */}
      <div className="bg-analytics-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold text-analytics-900 mb-4">
            Latest Research in Precision Medicine
          </h1>
          <p className="text-xl text-gray-600">
            Stay informed with the latest genomic insights and breakthrough discoveries in drug resistance mechanisms
          </p>
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <ArticlesGrid 
          articles={currentArticles}
          currentPage={currentPage}
          isLoading={isLoading}
          error={error}
        />
        
        {/* Pagination */}
        {articles.length > articlesPerPage && (
          <ArticlesPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

const ArticlesWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Articles />
    </ErrorBoundary>
  );
};

export default ArticlesWithErrorBoundary;

