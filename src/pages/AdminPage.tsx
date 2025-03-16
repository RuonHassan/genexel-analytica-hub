import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleForm } from "@/components/ArticleForm";
import { ReportForm } from "@/components/ReportForm";
import { ArticlesList } from "@/components/ArticlesList";
import { ReportsList } from "@/components/ReportsList";
import { Separator } from "@/components/ui/separator";

export function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="mt-6 space-y-8">
          <ArticleForm />
          <Separator className="my-8" />
          <div>
            <h2 className="text-2xl font-semibold mb-6">Published Articles</h2>
            <ArticlesList />
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6 space-y-8">
          <ReportForm />
          <Separator className="my-8" />
          <div>
            <h2 className="text-2xl font-semibold mb-6">Published Reports</h2>
            <ReportsList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 