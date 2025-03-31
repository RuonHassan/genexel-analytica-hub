import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import RichTextUploadModal from './RichTextUploadModal';
import { CategorySelect } from "./ui/category-select";

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const showUploads = import.meta.env.VITE_ENABLE_UPLOADS === "true";
  
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value === 'all' ? '' : value);
  };
  
  return (
    <div className="bg-analytics-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-analytics-900 mb-6 transition-all duration-700 opacity-0 translate-y-8 fade-in-item">
          Latest Research in Precision Medicine
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-100 opacity-0 translate-y-8 fade-in-item">
          Stay informed with the latest genomic insights and breakthrough discoveries in drug resistance mechanisms
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
          
          <CategorySelect
            value={categoryFilter || 'all'}
            onValueChange={handleCategoryChange}
            categories={categories}
            placeholder="All Categories"
          />
          
          {showUploads && (
            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="hidden md:flex bg-genexel-600 hover:bg-genexel-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Article
            </Button>
          )}
        </div>
      </div>
      
      {/* Use the new rich text upload modal */}
      {showUploads && (
        <RichTextUploadModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          type="article"
        />
      )}
    </div>
  );
};

export default ArticlesHero;
