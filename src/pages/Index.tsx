import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import FeaturedContent from "@/components/FeaturedContent";

const Index = () => {
  // Smooth scrolling effect for page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ValueProposition />
        <FeaturedContent />
        
        {/* Testimonials Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-analytics-100 text-analytics-800 text-sm font-medium mb-6">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-analytics-950 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from the educational institutions that have leveraged our data analysis to drive strategic decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Genexel's analysis transformed our understanding of student retention factors, allowing us to implement targeted support programs with measurable results.",
                  author: "Dr. Elizabeth Manning",
                  role: "Vice Chancellor, Cambridge University",
                },
                {
                  quote: "The depth and clarity of Genexel's reports have made complex data accessible to our entire leadership team, informing critical strategic decisions.",
                  author: "Professor James Wilson",
                  role: "Dean of Research, Oxford University",
                },
                {
                  quote: "Their custom analytics solution provided insights we couldn't find elsewhere, with a level of specificity perfectly tailored to our institution's unique challenges.",
                  author: "Dr. Rachel Thompson",
                  role: "Director of Analytics, Imperial College",
                },
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-8 rounded-xl relative">
                  <div className="absolute top-0 left-10 transform -translate-y-1/2 text-6xl text-genexel-300">"</div>
                  <blockquote className="text-gray-700 italic mb-6 relative z-10 pt-4">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-analytics-200 flex items-center justify-center text-analytics-700 font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-analytics-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-genexel-800 to-analytics-800 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Data into Actionable Insights?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Partner with Genexel and unlock the full potential of your institution's data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-8 py-3 bg-white text-genexel-800 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Started
              </a>
              <a 
                href="/reports" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Explore Reports
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
