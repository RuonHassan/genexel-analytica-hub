
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilePlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import UploadModal from "@/components/UploadModal";

// Sample data - in a real app this would come from an API
const allArticles = [
  {
    id: 1,
    title: "The Impact of AI on Higher Education Teaching Methods",
    summary: "Exploring how artificial intelligence is transforming educational approaches in universities.",
    date: "May 15, 2023",
    author: "Dr. Sarah Johnson",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Student Engagement in Online Learning Environments",
    summary: "Research findings on effective strategies for maintaining student engagement in virtual classrooms.",
    date: "April 28, 2023",
    author: "Prof. Michael Chen",
    category: "Learning Design",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Funding Challenges for Research Universities in 2023",
    summary: "Analysis of current funding landscapes and strategies for academic research institutions.",
    date: "June 02, 2023",
    author: "Dr. Emily Roberts",
    category: "Research",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Educational Policy Reforms: Impact on University Governance",
    summary: "How recent policy changes affect administrative structures in higher education institutions.",
    date: "May 22, 2023",
    author: "Prof. David Wilson",
    category: "Policy",
    imageUrl: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Data Privacy Concerns in Academic Research",
    summary: "Ethical considerations and best practices for handling sensitive data in university research projects.",
    date: "June 15, 2023",
    author: "Dr. Amanda Taylor",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Sustainable Campus Initiatives: Case Studies",
    summary: "Examining successful sustainability programs implemented at leading universities.",
    date: "April 10, 2023",
    author: "Dr. James Peterson",
    category: "Analysis",
    imageUrl: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=800",
  },
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(allArticles);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Effect for filtering articles based on search and category
  useEffect(() => {
    let result = allArticles;
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.summary.toLowerCase().includes(search) ||
          article.author.toLowerCase().includes(search)
      );
    }
    
    if (categoryFilter) {
      result = result.filter(
        (article) => article.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    setFilteredArticles(result);
  }, [searchTerm, categoryFilter]);

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
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Learning Design">Learning Design</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
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
        
        {/* Articles list */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="transition-all duration-700 opacity-0 translate-y-8 fade-in-item"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
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
      </main>
      
      <Footer />
      
      <UploadModal 
        open={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        type="article"
      />
    </div>
  );
};

export default Articles;
