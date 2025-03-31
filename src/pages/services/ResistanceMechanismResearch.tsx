import { Button } from "@/components/ui/button";
import { ArrowRight, Beaker, FileText, BookOpen } from "lucide-react";

export default function ResistanceMechanismResearch() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Resistance Mechanism Research Support</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Collaborating on research to discover, validate, and publish findings on drug resistance pathways.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Beaker className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Genomic Experiment Design</h3>
                <p className="text-muted-foreground">
                  Assistance in designing robust genomics experiments tailored for investigating drug resistance mechanisms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Bioinformatic Analysis & Interpretation</h3>
                <p className="text-muted-foreground">
                  Expert bioinformatic support for analyzing complex genomic data and interpreting resistance-related findings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Manuscript & Grant Support</h3>
                <p className="text-muted-foreground">
                  Contributions to manuscript preparation and grant applications, focusing on the genomic aspects of your research.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Advance Your Resistance Research</h3>
            <p className="mb-6">
              Partner with our genomics experts to accelerate your research on drug resistance mechanisms.
            </p>
            <Button className="gap-2">
              Start Collaboration <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 