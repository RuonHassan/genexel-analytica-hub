import { Button } from "@/components/ui/button";
import { ArrowRight, Dna, Settings, BarChartHorizontal } from "lucide-react";

export default function GenomicDataAnalysis() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Genomic Data Analysis & Bioinformatics</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Unlocking insights from complex genomic data to understand drug resistance.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Dna className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">NGS Data Processing</h3>
                <p className="text-muted-foreground">
                  Expertise in processing Next-Generation Sequencing (NGS) data, including quality control, alignment, and variant calling specific to resistance markers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BarChartHorizontal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pathway & Functional Analysis</h3>
                <p className="text-muted-foreground">
                  Identifying affected biological pathways and performing functional annotation of variants to understand resistance mechanisms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom Pipelines & Integration</h3>
                <p className="text-muted-foreground">
                  Developing tailored bioinformatics pipelines and integrating genomic data with clinical information for comprehensive insights.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Leverage Your Genomic Data</h3>
            <p className="mb-6">
              Partner with us to transform your raw sequencing data into actionable biological understanding of drug resistance.
            </p>
            <Button className="gap-2">
              Discuss Your Project <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 