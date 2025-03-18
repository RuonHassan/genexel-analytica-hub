import { Check, BookOpen, BarChart2, TrendingUp, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const ValueProposition = () => {
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

  const features = [
    {
      title: "Research Excellence",
      description: "Our team of researchers and analysts produce high-quality, peer-reviewed publications that set industry standards.",
      icon: BookOpen,
    },
    {
      title: "Data Driven Insights",
      description: "Transform complex educational data into clear, actionable insights that drive institutional improvement.",
      icon: BarChart2,
    },
    {
      title: "Strategic Implementation",
      description: "Beyond analysis, we provide strategic recommendations tailored to your institution's specific context and goals.",
      icon: TrendingUp,
    },
    {
      title: "Proven Track Record",
      description: "Trusted by leading higher education institutions across the country for reliable and impactful research.",
      icon: Award,
    },
  ];

  return (
    <div ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-genexel-50 rounded-bl-[100px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-analytics-50 rounded-tr-[80px] opacity-60"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={cn(
              "transition-all duration-700 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-analytics-100 text-analytics-800 text-sm font-medium mb-6">
              Why Choose Genexel
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-analytics-950 mb-6">
              Specialised in Advanced Data Analytics
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Genexel stands at the intersection of cutting-edge research and advanced data science. We understand the unique challenges facing modern organisations and provide tailored analytical solutions.
            </p>

            <ul className="space-y-4">
              {[
                "Comprehensive research methodologies",
                "Institution-specific data analysis",
                "Actionable recommendations",
                "Ongoing analytical support",
                "Custom report generation",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-genexel-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl border border-gray-100 hover:border-genexel-200 transition-all duration-300"
                style={{ transitionDelay: `${100 * index}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-genexel-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-genexel-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-analytics-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
