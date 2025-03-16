import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { uploadImage, upsertArticle, upsertReport } from '@/lib/supabase';
import RichTextEditor from './RichTextEditor';
import { toast } from 'sonner';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  type: 'article' | 'report';
}

const RichTextUploadModal = ({ open, onClose, type }: UploadModalProps) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [price, setPrice] = useState<number | ''>('');
  const [pages, setPages] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let thumbnailUrl = '';
      
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, type === 'article' ? 'articles' : 'reports');
      }
      
      if (type === 'article') {
        await upsertArticle({
          title,
          summary,
          content,
          category,
          thumbnail_url: thumbnailUrl || undefined,
        });
      } else {
        await upsertReport({
          title,
          summary,
          content,
          category,
          thumbnail_url: thumbnailUrl || undefined,
          price: typeof price === 'number' ? price : undefined,
          pages: typeof pages === 'number' ? pages : undefined,
        });
      }
      
      toast.success(`${type === 'article' ? 'Article' : 'Report'} uploaded successfully!`);
      resetForm();
      onClose();
      
      // Refresh the page after a short delay to show the new content
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error: any) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Error uploading ${type}: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setSummary('');
    setContent('');
    setCategory('');
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setPrice('');
    setPages('');
  };

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Upload {type === 'article' ? 'Article' : 'Report'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-right">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-right">
                Summary
              </Label>
              <Input
                id="summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Brief summary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-right">
                Category <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g., Research, News, Analysis"
                required
              />
            </div>
            
            {type === 'report' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g., 499"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pages" className="text-right">
                    Number of Pages
                  </Label>
                  <Input
                    id="pages"
                    type="number"
                    value={pages}
                    onChange={e => setPages(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g., 42"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail" className="text-right">
                Thumbnail Image
              </Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {thumbnailPreview && (
                <div className="mt-2 relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="max-h-32 rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailFile(null);
                      setThumbnailPreview(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-right">
                Content <span className="text-red-500">*</span>
              </Label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder={`Start writing your ${type} here...`}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>Upload {type === 'article' ? 'Article' : 'Report'}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RichTextUploadModal; 