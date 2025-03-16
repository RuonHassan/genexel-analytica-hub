import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    summary: string;
    date: string;
    category: string;
    imageUrl: string;
  };
}

const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={report.imageUrl}
          alt={report.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-analytics-50 text-analytics-700">
            {report.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {report.date}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {report.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {report.summary}
        </p>

        {/* Read More Link */}
        <Link 
          to={`/reports/${report.id}`} 
          className="text-genexel-600 font-medium text-sm hover:text-genexel-800 inline-flex items-center group mt-auto"
        >
          View Report 
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;
