
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, AuthRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import TopQueries from "./pages/TopQueries";
import TopPages from "./pages/TopPages";
import Performance from "./pages/Performance";
import UploadReport from "./pages/UploadReport";
import Settings from "./pages/Settings";
import DecliningKeywords from "./pages/DecliningKeywords";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

// Use the base URL from import.meta.env.BASE_URL
// This will be set to '/trend/' for web and './' for Electron
const getBasename = () => {
  return import.meta.env.BASE_URL;
};

// Detect if running in Electron
const isElectron = () => {
  return window && window.process && window.process.type;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={getBasename()}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              
              <Route element={<AuthRoute />}>
                <Route path="/auth" element={<Auth />} />
              </Route>
              
              <Route element={<ProtectedRoute />}>
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
                  path="/declining-keywords" 
                  element={
                    <DashboardLayout>
                      <DecliningKeywords />
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
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
