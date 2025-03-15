
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

// Sample data
const allReports = [
  {
    id: 101,
    title: "Higher Education Enrollment Trends 2023",
    summary: "Comprehensive analysis of student enrollment patterns across UK universities.",
    date: "July 10, 2023",
    price: 299,
    pages: 78,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 102,
    title: "Digital Transformation in University Administration",
    summary: "Strategic framework for implementing digital solutions in higher education management.",
    date: "June 15, 2023",
    price: 349,
    pages: 92,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 103,
    title: "International Student Recruitment: Market Analysis",
    summary: "Global trends, challenges, and opportunities in attracting international students.",
    date: "May 02, 2023",
    price: 499,
    pages: 125,
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 104,
    title: "Research Funding Landscape: 2023-2025 Forecast",
    summary: "Projections and analysis of research funding sources and allocation trends.",
    date: "June 28, 2023",
    price: 399,
    pages: 84,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 105,
    title: "Student Success Metrics: Beyond Graduation Rates",
    summary: "New frameworks for measuring student outcomes and institutional effectiveness.",
    date: "April 15, 2023",
    price: 249,
    pages: 62,
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
  },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState(allReports);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Effect for filtering reports
  useEffect(() => {
    let result = allReports;
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (report) =>
          report.title.toLowerCase().includes(search) ||
          report.summary.toLowerCase().includes(search)
      );
    }
    
    if (priceFilter) {
      if (priceFilter === "under300") {
        result = result.filter((report) => report.price < 300);
      } else if (priceFilter === "300to400") {
        result = result.filter((report) => report.price >= 300 && report.price <= 400);
      } else if (priceFilter === "over400") {
        result = result.filter((report) => report.price > 400);
      }
    }
    
    setFilteredReports(result);
  }, [searchTerm, priceFilter]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
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
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="under300">Under £300</SelectItem>
                  <SelectItem value="300to400">£300 - £400</SelectItem>
                  <SelectItem value="over400">Over £400</SelectItem>
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
          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredReports.map((report, index) => (
                <div 
                  key={report.id} 
                  className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <ReportCard report={report} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reports found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("");
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
