import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { uploadImage, upsertArticle, Article } from '@/lib/supabase';
import { toast } from 'sonner';
import RichTextEditor from './RichTextEditor';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  slug: z.string().min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'),
});

type ArticleFormProps = {
  article?: Article;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ArticleForm({ article, onSuccess, onCancel }: ArticleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(article?.image_url || null);
  const [content, setContent] = useState(article?.content || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      summary: article?.summary || '',
      category: article?.category || '',
      slug: article?.slug || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      let imageUrl = article?.image_url;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'article-images');
      }

      // Make sure all required fields are present
      const articleData = {
        title: values.title,
        content: content, // Use the rich text editor content
        summary: values.summary,
        category: values.category,
        slug: values.slug,
        image_url: imageUrl,
      };

      if (article?.id) {
        // If we're editing an existing article
        await upsertArticle({
          ...articleData,
          id: article.id
        });
      } else {
        // If we're creating a new article
        await upsertArticle(articleData);
      }

      toast.success(article ? 'Article updated successfully!' : 'Article created successfully!');
      form.reset();
      setImageFile(null);
      setPreviewImage(null);
      setContent('');
      onSuccess?.();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to save article');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{article ? 'Edit Article' : 'Create New Article'}</CardTitle>
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
                    <Input placeholder="Article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="url-friendly-slug" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        field.onChange(value);
                      }}
                    />
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
                    <Input placeholder="Article category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief summary of the article" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Content</FormLabel>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Write your article content here..."
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Featured Image</FormLabel>
              {previewImage && (
                <div className="relative aspect-video w-full max-w-md">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end gap-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
