import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Lightbulb, Route } from "lucide-react";

export default function ClinicalGenomicsConsultancy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Clinical Genomics Consultancy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Expert guidance on integrating advanced genomic diagnostics for drug resistance into clinical practice.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Route className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Implementation Strategy</h3>
                <p className="text-muted-foreground">
                  Developing strategies for adopting resistance testing protocols, selecting technologies, and optimizing clinical workflows.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Genomic Report Interpretation</h3>
                <p className="text-muted-foreground">
                  Support in understanding complex genomic resistance reports and translating findings into treatment decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Clinical Integration Support</h3>
                <p className="text-muted-foreground">
                  Guidance on incorporating genomic data into electronic health records and clinical decision support systems.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Integrate Genomics into Practice</h3>
            <p className="mb-6">
              Get expert advice on successfully implementing and utilizing genomic resistance diagnostics in your clinical setting.
            </p>
            <Button className="gap-2">
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 