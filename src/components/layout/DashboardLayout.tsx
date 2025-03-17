
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { MainSidebar } from "./MainSidebar";
import { MainHeader } from "./MainHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
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
      </div>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
