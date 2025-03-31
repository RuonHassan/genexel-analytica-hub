import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import ScrollToTop from "@/components/ScrollToTop";

// Import pages
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AdminPage } from "@/pages/AdminPage";
import ArticleTest from "@/components/ArticleTest";
import ArticleDetail from "@/pages/ArticleDetail";
import { LoginPage } from '@/pages/LoginPage';

// Import service pages
import GenomicDataAnalysis from "./pages/services/GenomicDataAnalysis";
import ResistanceMechanismResearch from "./pages/services/ResistanceMechanismResearch";
import CustomDiagnosticReports from "./pages/services/CustomDiagnosticReports";
import ClinicalGenomicsConsultancy from "./pages/services/ClinicalGenomicsConsultancy";
import GenomicsImplementationSupport from "./pages/services/GenomicsImplementationSupport";

// Create a Query Client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        console.error('React Query error:', error);
      }
    }
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background flex flex-col">
              <Header />
              <main className="flex-grow pt-16"> {/* Add pt-16 to account for fixed header */}
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:slug" element={<ArticleDetail />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/login" element={<LoginPage />} />
                  
                  {/* Service routes */}
                  <Route path="/services/genomic-data-analysis" element={<GenomicDataAnalysis />} />
                  <Route path="/services/resistance-mechanism-research" element={<ResistanceMechanismResearch />} />
                  <Route path="/services/custom-diagnostic-reports" element={<CustomDiagnosticReports />} />
                  <Route path="/services/clinical-genomics-consultancy" element={<ClinicalGenomicsConsultancy />} />
                  <Route path="/services/genomics-implementation-support" element={<GenomicsImplementationSupport />} />
                  
                  {/* Protected admin routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
