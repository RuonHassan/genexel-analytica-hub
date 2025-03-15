
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ArticleCard from "./ArticleCard";
import ReportCard from "./ReportCard";
import { Link } from "react-router-dom";

// Sample data
const sampleArticles = [
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
];

const sampleReports = [
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
];

const FeaturedContent = () => {
  const [activeTab, setActiveTab] = useState<"articles" | "reports">("articles");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div 
            className={cn(
              "transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-genexel-100 text-genexel-800 text-sm font-medium mb-6">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-analytics-950 mb-4">
              Featured Publications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest research articles and premium reports providing valuable insights for higher education institutions.
            </p>
          </div>

          <div 
            className={cn(
              "flex justify-center mt-8 mb-12 transition-all duration-500 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex bg-white p-1 rounded-full shadow-sm border border-gray-200">
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === "articles"
                    ? "bg-genexel-600 text-white"
                    : "bg-transparent text-gray-600 hover:text-genexel-600"
                )}
                onClick={() => setActiveTab("articles")}
              >
                Articles
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === "reports"
                    ? "bg-genexel-600 text-white"
                    : "bg-transparent text-gray-600 hover:text-genexel-600"
                )}
                onClick={() => setActiveTab("reports")}
              >
                Reports
              </button>
            </div>
          </div>
        </div>

        <div 
          className={cn(
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {activeTab === "articles" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sampleReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>

        <div 
          className={cn(
            "flex justify-center mt-12 transition-all duration-500 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Button 
            variant="outline" 
            size="lg" 
            asChild
            className="border-genexel-200 text-genexel-700 hover:bg-genexel-50"
          >
            <Link to={activeTab === "articles" ? "/articles" : "/reports"}>
              View All {activeTab === "articles" ? "Articles" : "Reports"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
