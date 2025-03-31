import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, ClipboardList, FlaskConical } from "lucide-react";

export default function CustomDiagnosticReports() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Custom Genomic Diagnostic Reports</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Tailored genomic reports providing actionable insights for specific clinical or research questions related to drug resistance.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <ClipboardList className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Targeted Analysis</h3>
                <p className="text-muted-foreground">
                  Genomic analysis focused on specific drugs, disease types, patient cohorts, or resistance pathways relevant to your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FlaskConical className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Biomarker Discovery & Panel Design</h3>
                <p className="text-muted-foreground">
                  Identifying novel resistance biomarkers and designing custom gene panels for targeted resistance testing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileCheck2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Clinically Actionable Reporting</h3>
                <p className="text-muted-foreground">
                  Clear, concise reports integrating genomic findings with clinical context, formatted for practical use in treatment decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Need Tailored Genomic Insights?</h3>
            <p className="mb-6">
              Get custom diagnostic reports designed around your specific research or clinical objectives.
            </p>
            <Button className="gap-2">
              Request Custom Report <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 