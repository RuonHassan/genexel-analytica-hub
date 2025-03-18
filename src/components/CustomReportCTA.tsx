import { Button } from "@/components/ui/button";

const CustomReportCTA = () => {
  return (
    <div className="bg-analytics-950 text-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Customised Analysis?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          We offer bespoke research and data analysis tailored to your organisation's specific needs. Contact our team to discuss your requirements.
        </p>
        <Button 
          size="lg" 
          className="bg-white text-analytics-950 hover:bg-gray-100 px-8"
        >
          Request Custom Report
        </Button>
      </div>
    </div>
  );
};

export default CustomReportCTA;
