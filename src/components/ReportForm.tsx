import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { uploadImage, upsertReport } from '@/lib/supabase';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
});

export function ReportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!reportFile) {
        toast.error('Please select a report file');
        return;
      }

      setIsLoading(true);
      
      // Upload report file
      const fileUrl = await uploadImage(reportFile, 'reports');
      
      // Upload thumbnail if provided
      let thumbnailUrl;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, 'report-thumbnails');
      }

      await upsertReport({
        ...values,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
      });

      toast.success('Report saved successfully!');
      form.reset();
      setReportFile(null);
      setThumbnailFile(null);
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error('Failed to save report');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload New Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Report title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Report category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Report description" 
                      className="h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Report File (PDF)</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>Thumbnail Image (Optional)</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Report'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 