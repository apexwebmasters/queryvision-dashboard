
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Download, Filter, PanelLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "../ui-custom/DateRangePicker";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";

export function MainHeader() {
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const { open, setOpen } = useSidebar();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (true) {
      case path.includes('/dashboard'):
        return 'Overview';
      case path.includes('/queries'):
        return 'Top Queries';
      case path.includes('/pages'):
        return 'Top Pages';
      case path.includes('/performance'):
        return 'Performance';
      case path.includes('/upload'):
        return 'Upload Report';
      case path.includes('/settings'):
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    toast.info("Refreshing data...");
    
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Data refreshed successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    toast.success("Report downloaded successfully!");
  };

  const toggleSidebar = () => {
    setOpen(!open);
    if (!open) {
      toast.info("Sidebar expanded");
    }
  };

  const showActions = !location.pathname.includes('/upload') && !location.pathname.includes('/settings');

  return (
    <header className="border-b border-border">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
            title={open ? "Hide Sidebar" : "Show Sidebar"}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">{getPageTitle()}</h1>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-3">
            <DateRangePicker />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
                  <div className="space-y-6 pr-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Date Range</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="last7" />
                          <Label htmlFor="last7">Last 7 days</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="last30" defaultChecked />
                          <Label htmlFor="last30">Last 30 days</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="last90" />
                          <Label htmlFor="last90">Last 90 days</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Metrics</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="impressions" defaultChecked />
                          <Label htmlFor="impressions">Impressions</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="clicks" defaultChecked />
                          <Label htmlFor="clicks">Clicks</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="ctr" defaultChecked />
                          <Label htmlFor="ctr">CTR</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="position" defaultChecked />
                          <Label htmlFor="position">Position</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Devices</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="desktop" defaultChecked />
                          <Label htmlFor="desktop">Desktop</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="mobile" defaultChecked />
                          <Label htmlFor="mobile">Mobile</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="tablet" defaultChecked />
                          <Label htmlFor="tablet">Tablet</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Advanced Options</h3>
                      <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="compare">Compare periods</Label>
                          <Switch id="compare" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="aggregate">Aggregate data</Label>
                          <Switch id="aggregate" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
