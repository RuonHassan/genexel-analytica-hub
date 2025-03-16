
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilePlus, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReportsHeroProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: string[];
  openUploadModal: () => void;
}

const ReportsHero = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  openUploadModal
}: ReportsHeroProps) => {
  return (
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
            onClick={openUploadModal}
            className="bg-genexel-600 hover:bg-genexel-700 text-white md:w-auto"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportsHero;
