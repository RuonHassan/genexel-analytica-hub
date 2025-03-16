import { useEffect } from "react";
import { Report } from "@/lib/supabase";
import ReportCard from "@/components/ReportCard";

interface ReportsGridProps {
  reports: Report[];
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
}

const ReportsGrid = ({
  reports,
  currentPage,
  isLoading,
  error,
}: ReportsGridProps) => {
  
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
      category: report.category,
      imageUrl: report.thumbnail_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
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
        <p className="text-gray-500 text-lg">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading reports. Please try again.</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No reports available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reports.map((report, index) => (
        <div 
          key={report.id} 
          className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
          style={{ transitionDelay: `${300 + index * 100}ms` }}
        >
          <ReportCard report={formatReportForCard(report)} />
        </div>
      ))}
    </div>
  );
};

export default ReportsGrid;
