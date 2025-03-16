import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, PenTool, Target } from "lucide-react";

export default function CustomReports() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Bespoke Reports</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Tailored research reports crafted to meet your specific organisational needs and objectives.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Requirements Analysis</h3>
                <p className="text-muted-foreground">
                  Thorough consultation to understand your specific needs and research objectives.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Collection & Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive data gathering and analysis tailored to your research enquiries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <PenTool className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Report Creation</h3>
                <p className="text-muted-foreground">
                  Professionally designed reports with clear insights and practical recommendations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Need a bespoke report?</h3>
            <p className="mb-6">
              Let us help you create a comprehensive report that addresses your specific research requirements.
            </p>
            <Button className="gap-2">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 