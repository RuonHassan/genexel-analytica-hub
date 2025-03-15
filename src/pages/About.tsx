
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-genexel-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-genexel-100 text-genexel-800 text-sm font-medium mb-6">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-analytics-950 mb-6">
                About Genexel Analytics
              </h1>
              <p className="text-xl text-gray-600">
                Pioneering data analytics solutions for higher education institutions since 2010
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-analytics-900">Our Mission & Vision</h2>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 text-genexel-700">Mission</h3>
                  <p className="text-gray-600">
                    To empower educational institutions with data-driven insights that enhance decision-making, 
                    improve student outcomes, and optimize resource allocation.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 text-genexel-700">Vision</h3>
                  <p className="text-gray-600">
                    To be the leading provider of analytical solutions in the education sector, 
                    creating a world where every educational decision is informed by comprehensive data analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-genexel-100 rounded-full opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092921461-39b11a63bc0d?auto=format&fit=crop&q=80&w=800" 
                alt="Team working on analytics" 
                className="rounded-xl relative z-10 shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-analytics-100 rounded-full opacity-70"></div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-analytics-100 text-analytics-800 text-sm font-medium mb-6">
                Meet The Experts
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-analytics-950 mb-4">
                Our Leadership Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our leadership combines expertise in data science, educational research, and technology 
                to deliver transformative analytics solutions.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="glass-card p-6 rounded-xl text-center max-w-md">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <div className="absolute inset-0 rounded-full bg-genexel-200 transform -rotate-6"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                    alt="Nour Hassan" 
                    className="w-full h-full object-cover rounded-full relative z-10 border-2 border-white"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-analytics-900 mb-1">Nour Hassan</h3>
                <p className="text-genexel-600 font-medium text-lg mb-3">Founder & CEO</p>
                <p className="text-gray-600">Former Dean of Research with 15+ years experience in educational data analysis and a passion for transforming how institutions leverage their data assets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-genexel-100 text-genexel-800 text-sm font-medium mb-6">
                Our Principles
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-analytics-950 mb-4">
                Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide our work and ensure we deliver exceptional value to every client
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Data Integrity",
                  description: "We maintain the highest standards of data accuracy, reliability, and security"
                },
                {
                  title: "Educational Impact",
                  description: "We focus on solutions that meaningfully improve educational outcomes"
                },
                {
                  title: "Client Partnership",
                  description: "We build collaborative relationships that prioritize client success"
                },
                {
                  title: "Continuous Innovation",
                  description: "We constantly evolve our methods to stay at the forefront of analytics technology"
                }
              ].map((value, index) => (
                <div key={index} className="glass-card p-6 rounded-xl border-t-4 border-genexel-500">
                  <h3 className="text-xl font-semibold text-analytics-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
