
import { useEffect } from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { MainSidebar } from "./MainSidebar";
import { MainHeader } from "./MainHeader";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { toast } from "sonner";

// This component is for the floating sidebar toggle button
function SidebarToggleButton() {
  const { open, setOpen } = useSidebar();
  
  const toggleSidebar = () => {
    setOpen(!open);
    if (!open) {
      toast.info("Sidebar expanded");
    }
  };
  
  return (
    <Button 
      variant="secondary"
      size="icon"
      className={`fixed left-4 bottom-4 z-50 shadow-md rounded-full h-10 w-10 ${open ? 'md:hidden' : ''}`}
      onClick={toggleSidebar}
    >
      <PanelLeft className="h-5 w-5" />
      <span className="sr-only">{open ? 'Hide Sidebar' : 'Show Sidebar'}</span>
    </Button>
  );
}

// Content wrapper with sidebar context
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebar();
  
  // Ensure sidebar is visible on larger screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !open) {
        setOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [open, setOpen]);
  
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-background/90">
      <MainSidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <MainHeader />
        <main className="flex-1 overflow-auto p-6 transition-all duration-300 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <SidebarToggleButton />
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardContent>{children}</DashboardContent>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
