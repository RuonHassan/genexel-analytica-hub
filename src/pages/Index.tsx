import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import FeaturedContent from "@/components/FeaturedContent";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ValueProposition />
        <FeaturedContent />
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-genexel-800 to-analytics-800 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Revolutionize Drug Resistance Diagnostics?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Partner with Genexel and unlock the full potential of genomic diagnostics for precision medicine.
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
                Explore Research
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
