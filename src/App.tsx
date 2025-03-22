import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchDataProvider } from "./contexts/SearchDataContext";
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
import { useEffect } from "react";

const getBasename = () => {
  const basename = import.meta.env.BASE_URL;
  console.log("Base URL:", basename);
  return basename;
};

const isElectron = () => {
  const electron = !!(window && window.process && window.process.versions && window.process.versions.electron);
  console.log("Is Electron:", electron);
  return electron;
};

const DebugInfo = () => {
  useEffect(() => {
    console.log("DebugInfo component mounted");
    console.log("Current URL:", window.location.href);
    console.log("Environment:", import.meta.env.MODE);
    console.log("Base URL:", import.meta.env.BASE_URL);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-xs z-50">
      DEBUG: {import.meta.env.MODE} | Base: {import.meta.env.BASE_URL} | URL: {window.location.pathname}
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

console.log("App rendering started");

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter basename={getBasename()}>
            {isElectron() && <DebugInfo />}
            <AuthProvider>
              <SearchDataProvider>
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
              </SearchDataProvider>
            </AuthProvider>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
