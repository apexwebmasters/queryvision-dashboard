import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeploymentGuide } from "@/components/deployment/DeploymentGuide";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-in">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your dashboard preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" placeholder="https://example.com" />
                <p className="text-xs text-muted-foreground">
                  Enter the domain that matches your Google Search Console property
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-date-range">Default Date Range</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="default-date-range">
                    <SelectValue placeholder="Select a date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="180">Last 6 months</SelectItem>
                    <SelectItem value="365">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Notifications</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
                <p className="text-xs text-muted-foreground">
                  Receive notifications when new reports are processed
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">
                    Auto-refresh dashboard
                  </Label>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically refresh dashboard data every hour
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how information is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="table-rows">Default Table Rows</Label>
                <Select defaultValue="10">
                  <SelectTrigger id="table-rows">
                    <SelectValue placeholder="Select number of rows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 rows</SelectItem>
                    <SelectItem value="10">10 rows</SelectItem>
                    <SelectItem value="20">20 rows</SelectItem>
                    <SelectItem value="50">50 rows</SelectItem>
                    <SelectItem value="100">100 rows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Chart Colors</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1.5">
                    <div className="h-8 w-full rounded-md bg-primary" />
                    <p className="text-xs text-center">Primary</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-8 w-full rounded-md bg-blue-500" />
                    <p className="text-xs text-center">Blue</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-8 w-full rounded-md bg-green-500" />
                    <p className="text-xs text-center">Green</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-8 w-full rounded-md bg-amber-500" />
                    <p className="text-xs text-center">Amber</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">
                    Enable animations
                  </Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Show animations and transitions in the dashboard
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure how your data is processed and stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention</Label>
                <Select defaultValue="365">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">3 months</SelectItem>
                    <SelectItem value="180">6 months</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="0">Forever</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How long to keep historical data
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-process">
                    Auto-process uploaded reports
                  </Label>
                  <Switch id="auto-process" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically process reports after upload
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="combine-reports">
                    Combine overlapping reports
                  </Label>
                  <Switch id="combine-reports" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Merge data when reports have overlapping date ranges
                </p>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                  Clear All Data
                </Button>
                <p className="mt-2 text-xs text-center text-muted-foreground">
                  This will permanently delete all your uploaded reports and processed data
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="mt-6">
          {user?.email === "demo@example.com" && <DeploymentGuide />}
          
          <Card>
            <CardHeader>
              <CardTitle>User Documentation</CardTitle>
              <CardDescription>
                Reference guides and helpful information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Additional Resources</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a 
                      href="https://help.hostinger.com/en/articles/4455931-how-to-upload-website-to-hostinger" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Hostinger Official Guide
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vitejs.dev/guide/static-deploy.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Vite Deployment Guide
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://react.dev/learn/start-a-new-react-project" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      React Official Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
