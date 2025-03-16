
import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MainSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);

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
    <Sidebar open={open} onOpenChange={setOpen} className="border-r border-border">
      <SidebarHeader className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className={cn("font-semibold text-lg transition-opacity", !open && "opacity-0")}>
            SearchVision
          </span>
        </div>
        <SidebarTrigger asChild>
          <button className="p-2 rounded-md hover:bg-sidebar-accent transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center text-muted-foreground">
        {open && <p>Search Console Analytics</p>}
      </SidebarFooter>
    </Sidebar>
  );
}
