
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilePlus, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import UploadModal from "@/components/UploadModal";
import { useQuery } from "@tanstack/react-query";
import { Report, getReports } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

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

  // Apply filters and pagination to reports
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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 pb-16">
        {/* Hero Banner */}
        <div className="bg-genexel-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-analytics-900 mb-6 transition-all duration-700 opacity-0 translate-y-8 fade-in-item">
              Premium Research Reports
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 transition-all duration-700 delay-100 opacity-0 translate-y-8 fade-in-item">
              In-depth analysis and data-driven insights to inform decision-making at your institution.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-10 transition-all duration-700 delay-150 opacity-0 translate-y-8 fade-in-item">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm text-genexel-700 bg-genexel-100 px-3 py-1 rounded-full">
                      <Info className="h-3.5 w-3.5" />
                      <span>About our reports</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Our premium reports provide comprehensive data analysis and actionable insights for higher education institutions. Each report undergoes rigorous peer review and includes both data visualizations and strategic recommendations.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto transition-all duration-700 delay-200 opacity-0 translate-y-8 fade-in-item">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentReports.map((report, index) => (
                  <div 
                    key={report.id} 
                    className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <ReportCard report={formatReportForCard(report)} />
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
              <p className="text-gray-500 text-lg">No reports found matching your criteria.</p>
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
        
        {/* Customized Reports CTA */}
        <div className="bg-analytics-950 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Customized Analysis?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              We offer bespoke research and data analysis tailored to your institution's specific needs. Contact our team to discuss your requirements.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-analytics-950 hover:bg-gray-100 px-8"
            >
              Request Custom Report
            </Button>
          </div>
        </div>
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
