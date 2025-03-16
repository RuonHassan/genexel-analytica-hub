import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users2, Video } from "lucide-react";

export default function Workshops() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Workshops & Training</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Interactive workshops and training sessions designed to enhance your team's analytical capabilities.
          </p>

          <div className="grid gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tailored Training Programmes</h3>
                <p className="text-muted-foreground">
                  Bespoke workshops that address your organisation's specific learning objectives and skill requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Sessions</h3>
                <p className="text-muted-foreground">
                  Hands-on learning experiences with real-world examples and practical exercises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Virtual Learning</h3>
                <p className="text-muted-foreground">
                  Flexible online workshop options with live instruction and interactive elements.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Empower your team</h3>
            <p className="mb-6">
              Invest in your team's development with our expert-led workshops and training programmes.
            </p>
            <Button className="gap-2">
              View Programme Calendar <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 