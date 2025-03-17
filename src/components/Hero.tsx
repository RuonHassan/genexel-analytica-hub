import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, FileText, BarChart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center pt-12 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white to-genexel-50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3294f0_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-[10%] w-20 h-20 bg-genexel-200/60 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-[15%] w-32 h-32 bg-analytics-200/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div 
            className={`transition-all duration-700 delay-100 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-genexel-100 text-genexel-800 text-sm font-medium mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-genexel-500 mr-2"></span>
              Transforming Higher Education with Data Analytics
            </div>
          </div>

          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-analytics-950 transition-all duration-700 delay-200 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Turn Educational Data Into 
            <span className="text-genexel-600 block mt-2">Strategic Insights</span>
          </h1>

          <p 
            className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-300 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Genexel delivers comprehensive data analysis and research publications tailored specifically for higher education institutions.
          </p>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transition-all duration-700 delay-400 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-genexel-600 hover:bg-genexel-700 text-white px-8"
              asChild
            >
              <Link to="/reports">
                Explore Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white border-genexel-200 text-genexel-800 hover:bg-genexel-50"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 md:mt-32 transition-all duration-700 delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="glass-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-genexel-100 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-genexel-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className="text-gray-600">Comprehensive analysis of educational metrics and performance indicators.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-genexel-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-genexel-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Research Reports</h3>
            <p className="text-gray-600">In-depth publications with actionable insights for educational institutions.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-genexel-100 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-genexel-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Analytics</h3>
            <p className="text-gray-600">Tailored analytical solutions designed for your institution's specific needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
