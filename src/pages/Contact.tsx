
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ContactFormValues {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully",
      description: "We'll get back to you as soon as possible.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-genexel-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-genexel-100 text-genexel-800 text-sm font-medium mb-6">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-analytics-950 mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600">
                Have questions about our services or want to discuss your institution's specific needs? 
                Our team is ready to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact information */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-analytics-900 mb-6">Contact Information</h2>
                
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-genexel-100 flex items-center justify-center">
                      <Mail className="text-genexel-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-analytics-900 mb-1">Email</h3>
                      <a href="mailto:info@genexel.com" className="text-genexel-600 hover:underline">
                        info@genexel.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-genexel-100 flex items-center justify-center">
                      <Phone className="text-genexel-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-analytics-900 mb-1">Phone</h3>
                      <a href="tel:+442071234567" className="text-genexel-600 hover:underline">
                        +44 (0) 20 7123 4567
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-genexel-100 flex items-center justify-center">
                      <MapPin className="text-genexel-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-analytics-900 mb-1">Office</h3>
                      <p className="text-gray-600">
                        1 Innovation Square<br />
                        Cambridge, CB2 1TP<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-genexel-100 flex items-center justify-center">
                      <Clock className="text-genexel-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-analytics-900 mb-1">Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:30 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact form */}
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-analytics-900 mb-6">Send Us a Message</h2>
                
                <div className="glass-card p-8 rounded-xl">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="organization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization</FormLabel>
                              <FormControl>
                                <Input placeholder="University Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="How can we help?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <textarea 
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-32"
                                placeholder="Please describe how we can assist you..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-genexel-600 hover:bg-genexel-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-analytics-900">Find Us</h2>
              <p className="text-gray-600 mt-2">
                Visit our office in Cambridge
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg h-96">
              {/* Placeholder for a map - in a real app, integrate Google Maps or similar */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-600">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
