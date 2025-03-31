import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users2, Wrench } from "lucide-react";

export default function GenomicsImplementationSupport() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Genomics Implementation Support & Training</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Equipping clinical and research teams with the knowledge and tools to effectively utilize genomic resistance data.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Targeted Training Modules</h3>
                <p className="text-muted-foreground">
                  Bespoke training sessions covering genomic data interpretation, bioinformatics tools, and resistance analysis techniques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Platform & Workflow Support</h3>
                <p className="text-muted-foreground">
                  Assistance in setting up internal analysis pipelines or utilizing Genexel's platform, including SOP development.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Team Enablement</h3>
                <p className="text-muted-foreground">
                  Hands-on support and 'train-the-trainer' programs to build lasting genomic capabilities within your institution.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Empower Your Team with Genomics</h3>
            <p className="mb-6">
              Invest in your team's development with our expert-led support and training programs focused on genomic resistance.
            </p>
            <Button className="gap-2">
              Explore Training Options <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 