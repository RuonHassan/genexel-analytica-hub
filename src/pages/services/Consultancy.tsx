import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Lightbulb, Users } from "lucide-react";

export default function Consultancy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Consultancy Services</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Expert guidance and strategic insights to help your organisation make data-driven decisions.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Strategic Analysis</h3>
                <p className="text-muted-foreground">
                  In-depth analysis of your organisational challenges and opportunities using advanced analytical methods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Solution Development</h3>
                <p className="text-muted-foreground">
                  Bespoke solutions and recommendations based on your specific organisational context and goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Implementation Support</h3>
                <p className="text-muted-foreground">
                  Hands-on guidance and support throughout the implementation of recommended solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Transform your organisation with data</h3>
            <p className="mb-6">
              Partner with our expert consultants to unlock new opportunities and drive growth through data-driven insights.
            </p>
            <Button className="gap-2">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 