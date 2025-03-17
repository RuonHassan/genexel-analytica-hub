import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "@/lib/supabase";
import ReportsGrid from "@/components/ReportsGrid";
import ArticlesPagination from "@/components/ArticlesPagination";
import RecentArticles from "@/components/RecentArticles";

// Error boundary for handling errors gracefully
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="text-genexel-600 hover:text-genexel-800"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 9;

  const {
    data: reports = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const currentReports = reports.slice(startIndex, endIndex);

  return (
    <ErrorBoundary>
      <>
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Market Research Reports
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Access comprehensive market research reports covering various industries and sectors.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Reports Grid - Takes up most of the space */}
            <div className="lg:w-3/4">
              <ReportsGrid
                reports={currentReports}
                currentPage={currentPage}
                isLoading={isLoading}
                error={error}
              />

              {totalPages > 1 && (
                <div className="mt-8">
                  <ArticlesPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </div>
            
            {/* Right Sidebar - Recent Articles */}
            <div className="lg:w-1/4 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <RecentArticles />
              </div>
            </div>
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
};

export default Reports;
