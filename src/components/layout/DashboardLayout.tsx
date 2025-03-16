
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { MainSidebar } from "./MainSidebar";
import { MainHeader } from "./MainHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to dashboard if at root
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <MainHeader />
          <main className="flex-1 overflow-auto p-6 transition-all-300 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
