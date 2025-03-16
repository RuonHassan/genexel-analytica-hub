
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilePlus } from "lucide-react";

interface ArticlesHeroProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: string[];
  openUploadModal: () => void;
}

const ArticlesHero = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  openUploadModal
}: ArticlesHeroProps) => {
  return (
    <div className="bg-analytics-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-analytics-900 mb-6 transition-all duration-700 opacity-0 translate-y-8 fade-in-item">
          Latest Articles & Insights
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-100 opacity-0 translate-y-8 fade-in-item">
          Discover cutting-edge research and analysis from our experts in higher education data analytics.
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto transition-all duration-700 delay-200 opacity-0 translate-y-8 fade-in-item">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
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

export default ArticlesHero;
