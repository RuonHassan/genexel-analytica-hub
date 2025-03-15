
import { CalendarIcon, Download, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface Report {
  id: number;
  title: string;
  summary: string;
  date: string;
  price: number;
  pages: number;
  imageUrl: string;
}

interface ReportCardProps {
  report: Report;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="relative overflow-hidden md:col-span-1 h-48 md:h-full">
          <div className={`absolute inset-0 bg-gray-200 ${imageLoaded ? 'hidden' : 'block'}`}></div>
          <img
            ref={imageRef}
            src={report.imageUrl}
            alt={report.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Premium Report</span>
          </div>
        </div>
        
        <CardContent className="p-5 md:col-span-2 flex flex-col">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{report.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{report.pages} pages</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-analytics-900 group-hover:text-genexel-600 transition-colors">
            {report.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{report.summary}</p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-analytics-800">£{report.price}</span>
              <span className="text-gray-500 text-sm ml-1">+ VAT</span>
            </div>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-genexel-600 hover:bg-genexel-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Purchase Report
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ReportCard;
