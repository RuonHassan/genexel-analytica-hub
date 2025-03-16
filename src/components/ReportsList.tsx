import { useEffect, useState } from 'react';
import { Report, getReports, deleteReport } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Trash2, Eye } from "lucide-react";
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewReport, setPreviewReport] = useState<Report | null>(null);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      await deleteReport(id);
      toast.success('Report deleted successfully');
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Failed to delete report');
    }
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  if (reports.length === 0) {
    return <div className="text-center py-8">No reports found. Upload your first report!</div>;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              {report.thumbnail_url ? (
                <img
                  src={report.thumbnail_url}
                  alt={report.title}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <CardTitle className="text-lg line-clamp-2">{report.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(report.created_at), 'MMM d, yyyy')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground mb-2">
                Category: {report.category}
              </div>
              {report.description && (
                <p className="text-sm line-clamp-3">{report.description}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(report.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPreviewReport(report)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDownload(report.file_url, report.title)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!previewReport} onOpenChange={() => setPreviewReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{previewReport?.title}</DialogTitle>
          </DialogHeader>
          {previewReport && (
            <div className="relative w-full aspect-[4/3]">
              <iframe
                src={`${previewReport.file_url}#toolbar=0`}
                className="absolute inset-0 w-full h-full"
                title={previewReport.title}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 