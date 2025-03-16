
import { Report } from "@/lib/supabase";
import ReportCard from "@/components/ReportCard";

interface ReportsGridProps {
  reports: Report[];
  formatReportForCard: (report: Report) => {
    id: string;
    title: string;
    summary: string;
    date: string;
    price: number;
    pages: number;
    imageUrl: string;
  };
}

const ReportsGrid = ({ reports, formatReportForCard }: ReportsGridProps) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No reports found matching your criteria.</p>
        <button 
          className="mt-2 text-genexel-600 underline"
          onClick={() => {
            // This will be handled in the parent component
            // We're just rendering the UI here
          }}
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
