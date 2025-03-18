import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ArticleCard from "./ArticleCard";
import ReportCard from "./ReportCard";
import { Link } from "react-router-dom";
import { getArticles, getReports, Article, Report } from "@/lib/supabase";

const FeaturedContent = () => {
  const [activeTab, setActiveTab] = useState<"articles" | "reports">("articles");
  const [isVisible, setIsVisible] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch articles and reports from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [articlesData, reportsData] = await Promise.all([
          getArticles(),
          getReports()
        ]);
        
        setArticles(articlesData.slice(0, 3)); // Limit to 3 articles
        setReports(reportsData.slice(0, 3)); // Limit to 3 reports
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Intersection observer for animation
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

  // Transform Supabase articles to match ArticleCard component props
  const transformedArticles = articles.map(article => ({
    id: article.id,
    title: article.title,
    summary: article.summary || article.description || '',
    date: new Date(article.created_at).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }),
    author: "Genexel Analytics",
    category: article.category,
    imageUrl: article.thumbnail_url || article.image_url || '',
    slug: article.slug
  }));

  // Transform Supabase reports to match ReportCard component props
  const transformedReports = reports.map(report => ({
    id: report.id,
    title: report.title,
    summary: report.summary,
    date: report.date || new Date(report.created_at).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }),
    category: report.category,
    imageUrl: report.thumbnail_url
  }));

  // Loading and empty state components
  const LoadingState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-genexel-600"></div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <div className="w-12 h-12 text-genexel-400">📋</div>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h3>
      <p className="text-gray-500 max-w-md">
        {activeTab === "articles" 
          ? "Our team is working on valuable articles. Check back soon for the latest insights."
          : "Premium reports are being prepared. Please check back soon for in-depth analyses."
        }
      </p>
    </div>
  );

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
              Discover our latest research articles and premium reports providing valuable insights for organisations.
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
          {isLoading ? (
            <LoadingState />
          ) : activeTab === "articles" ? (
            transformedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {transformedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )
          ) : (
            transformedReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {transformedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )
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
