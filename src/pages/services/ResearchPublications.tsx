import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react";

export default function ResearchPublications() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Research Publications</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Expert guidance in preparing and publishing high-quality research papers and academic publications.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Literature Review</h3>
                <p className="text-muted-foreground">
                  Comprehensive analysis of existing research and publications within your field of study.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Manuscript Preparation</h3>
                <p className="text-muted-foreground">
                  Professional support in writing, formatting, and structuring your research papers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Publication Support</h3>
                <p className="text-muted-foreground">
                  Expert guidance on journal selection, submission processes, and peer review responses.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Ready to publish your research?</h3>
            <p className="mb-6">
              Let our team of experienced researchers help you share your findings with the academic community.
            </p>
            <Button className="gap-2">
              Enquire Now <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 