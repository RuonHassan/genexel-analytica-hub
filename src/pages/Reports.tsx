
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Report, getReports } from "@/lib/supabase";
import Footer from "@/components/Footer";
import ReportsHero from "@/components/ReportsHero";
import ReportsGrid from "@/components/ReportsGrid";
import ArticlesPagination from "@/components/ArticlesPagination";
import CustomReportCTA from "@/components/CustomReportCTA";
import UploadModal from "@/components/UploadModal";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 4;

  // Fetch reports using React Query
  const { data: allReports = [], isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  // Apply filters to reports
  const getFilteredReports = () => {
    let filtered = [...allReports];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(search) ||
          (report.description && report.description.toLowerCase().includes(search)) ||
          report.category.toLowerCase().includes(search)
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(
        (report) => report.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    return filtered;
  };

  const filteredReports = getFilteredReports();
  
  // Calculate pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Get unique categories from the reports
  const categories = [...new Set(allReports.map(report => report.category))];

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

  // Format report data for ReportCard component
  const formatReportForCard = (report: Report) => {
    return {
      id: report.id,
      title: report.title,
      summary: report.description || "",
      date: new Date(report.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      price: 299, // Default price since we don't have this in DB yet
      pages: 42,  // Default pages since we don't have this in DB yet
      imageUrl: report.thumbnail_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    };
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 pb-16">
        {/* Hero Banner */}
        <ReportsHero 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          openUploadModal={() => setIsUploadModalOpen(true)}
        />
        
        {/* Reports list */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading reports...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">Error loading reports. Please try again.</p>
            </div>
          ) : currentReports.length > 0 ? (
            <>
              <ReportsGrid 
                reports={currentReports} 
                formatReportForCard={formatReportForCard} 
              />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <ArticlesPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reports found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={handleClearFilters}
                className="mt-2 text-genexel-600"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Customized Reports CTA */}
        <CustomReportCTA />
      </main>
      
      <Footer />
      
      <UploadModal 
        open={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        type="report"
      />
    </div>
  );
};

export default Reports;
