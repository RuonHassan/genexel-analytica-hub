import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleForm } from "@/components/ArticleForm";
import { ReportForm } from "@/components/ReportForm";
import { ArticlesList } from "@/components/ArticlesList";
import { ReportsList } from "@/components/ReportsList";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/admin/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Signed in as {user?.email}
          </span>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
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