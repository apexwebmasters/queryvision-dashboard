
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TopQueries from "./pages/TopQueries";
import TopPages from "./pages/TopPages";
import Performance from "./pages/Performance";
import UploadReport from "./pages/UploadReport";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/queries" 
            element={
              <DashboardLayout>
                <TopQueries />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/pages" 
            element={
              <DashboardLayout>
                <TopPages />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/performance" 
            element={
              <DashboardLayout>
                <Performance />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <DashboardLayout>
                <UploadReport />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
