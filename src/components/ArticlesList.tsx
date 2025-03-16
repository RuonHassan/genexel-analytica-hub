import { useEffect, useState } from 'react';
import { Article, getArticles, deleteArticle } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArticleForm } from './ArticleForm';

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteArticle(id);
      toast.success('Article deleted successfully');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    }
  };

  const handleEdit = (article: Article) => {
    console.log('Editing article:', article);
    setTimeout(() => {
      setEditingArticle(article);
      setIsDialogOpen(true);
      console.log('Dialog should be open now with article:', article.id);
    }, 0);
  };

  const handleEditComplete = () => {
    setEditingArticle(null);
    setIsDialogOpen(false);
    fetchArticles();
  };

  const handleDialogChange = (open: boolean) => {
    console.log('Dialog open change requested:', open);
    if (!open) {
      // Only close the dialog, but keep the article data until animation completes
      setIsDialogOpen(false);
      // Clear the article data after the dialog closing animation
      setTimeout(() => {
        setEditingArticle(null);
        console.log('Article data cleared after dialog closed');
      }, 300); // Match the dialog animation duration
    } else {
      setIsDialogOpen(open);
    }
  };

  useEffect(() => {
    console.log('Dialog open state:', isDialogOpen);
    console.log('Editing article:', editingArticle?.id);
  }, [isDialogOpen, editingArticle]);

  if (isLoading) {
    return <div className="text-center py-8">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center py-8">No articles found. Create your first article!</div>;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            {article.image_url && (
              <div className="relative aspect-video">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {format(new Date(article.created_at), 'MMM d, yyyy')}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground mb-2">
                Category: {article.category}
              </div>
              {article.summary && (
                <p className="text-sm line-clamp-3">{article.summary}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(article.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(article)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={handleDialogChange}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {editingArticle && (
            <div className="py-4">
              <ArticleForm
                article={editingArticle}
                onSuccess={handleEditComplete}
                onCancel={() => handleDialogChange(false)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 