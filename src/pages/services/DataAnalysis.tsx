import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, LineChart, PieChart } from "lucide-react";

export default function DataAnalysis() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Data Analysis Services</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Transform your raw data into actionable insights with our comprehensive data analysis expertise.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BarChart2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Statistical Analysis</h3>
                <p className="text-muted-foreground">
                  Rigorous statistical methods to validate hypotheses and uncover patterns within your data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Predictive Modelling</h3>
                <p className="text-muted-foreground">
                  Advanced forecasting techniques to help you make informed, data-driven decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <PieChart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Visualisation</h3>
                <p className="text-muted-foreground">
                  Clear, compelling visualisations that communicate your data's story effectively.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
            <p className="mb-6">
              Let us help you unlock the full potential of your data with our expert analysis services.
            </p>
            <Button className="gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 