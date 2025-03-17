
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {
  BarChart3,
  FileText,
  Home,
  LineChart,
  Menu,
  Search,
  Settings,
  Upload,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MainSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  const menuItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Top Queries",
      path: "/queries",
      icon: Search,
    },
    {
      title: "Top Pages",
      path: "/pages",
      icon: FileText,
    },
    {
      title: "Performance",
      path: "/performance",
      icon: LineChart,
    },
    {
      title: "Declining Keywords",
      path: "/declining-keywords",
      icon: TrendingDown,
    },
    {
      title: "Upload Report",
      path: "/upload",
      icon: Upload,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r border-border shadow-md">
      <SidebarHeader className="flex h-16 items-center justify-between px-4 bg-primary/5">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className={cn("font-semibold text-lg transition-opacity text-foreground", !open && "opacity-0")}>
            SearchVision
          </span>
        </div>
        <SidebarTrigger>
          <button className="p-2 rounded-md hover:bg-primary/10 transition-colors">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} className="mb-1">
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center border-t border-border/50 text-sidebar-foreground/70">
        {open && <p className="animate-fade-in">Search Console Analytics © 2023</p>}
      </SidebarFooter>
    </Sidebar>
  );
}
