import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
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
                    To empower organisations with data-driven insights that enhance decision-making, improve outcomes, and optimise resource allocation.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 text-genexel-700">Vision</h3>
                  <p className="text-gray-600">
                    To be the leading provider of analytical solutions, creating a world where every decision is informed by comprehensive data analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-genexel-100 rounded-full opacity-70"></div>
              <img 
                src="/assets/images/data-analytics-concept.jpg" 
                alt="Team working on analytics" 
                className="rounded-xl relative z-10 shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-analytics-100 rounded-full opacity-70"></div>
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
                  description: "We build collaborative relationships that prioritise client success"
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
    </div>
  );
};

export default About;
