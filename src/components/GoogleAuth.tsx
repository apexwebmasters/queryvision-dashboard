
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, RefreshCw, Database, LogOut } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  isGoogleAuthenticated,
  initGoogleApi,
  signInWithGoogle,
  signOutFromGoogle,
  getSearchConsoleProperties,
  fetchSearchConsoleReport,
  SearchConsoleProperty
} from "@/utils/googleSearchConsole";

interface GoogleAuthProps {
  onReportFetched?: (data: any) => void;
}

export function GoogleAuth({ onReportFetched }: GoogleAuthProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<SearchConsoleProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchProgress, setFetchProgress] = useState(0);

  useEffect(() => {
    const initialize = async () => {
      await initGoogleApi();
      const authStatus = isGoogleAuthenticated();
      setIsAuthenticated(authStatus);
      setIsInitializing(false);
      
      if (authStatus) {
        loadProperties();
      }
    };
    
    initialize();
  }, []);

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const props = await getSearchConsoleProperties();
      setProperties(props);
      if (props.length > 0) {
        setSelectedProperty(props[0].siteUrl);
      }
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const success = await signInWithGoogle();
    setIsAuthenticated(success);
    setIsLoading(false);
    
    if (success) {
      toast.success("Successfully connected to Google Search Console");
      loadProperties();
    }
  };

  const handleSignOut = async () => {
    await signOutFromGoogle();
    setIsAuthenticated(false);
    setProperties([]);
    setSelectedProperty("");
  };

  const handleFetchReport = async () => {
    if (!selectedProperty) {
      toast.error("Please select a property first");
      return;
    }
    
    setIsFetching(true);
    setFetchProgress(0);
    
    // Get date range for last 30 days
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    try {
      // Simulate progress
      const interval = setInterval(() => {
        setFetchProgress((prev) => {
          const newProgress = prev + 20;
          return newProgress >= 100 ? 99 : newProgress;
        });
      }, 500);
      
      const reportData = await fetchSearchConsoleReport(selectedProperty, startDate, endDate);
      
      clearInterval(interval);
      setFetchProgress(100);
      
      if (onReportFetched) {
        onReportFetched(reportData);
      }
      
      setTimeout(() => {
        setIsFetching(false);
        toast.success("Search Console data fetched successfully");
      }, 500);
    } catch (error) {
      console.error("Failed to fetch report", error);
      toast.error("Failed to fetch report data");
      setIsFetching(false);
    }
  };

  if (isInitializing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Initializing Google API...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Google Search Console</CardTitle>
        <CardDescription>
          Connect directly to your Google Search Console account to import data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isAuthenticated ? (
          <div className="py-6 text-center">
            <Button 
              onClick={handleSignIn} 
              disabled={isLoading}
              className="py-6 px-8 space-x-2 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 text-black"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path 
                    fill="#4285F4" 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  />
                  <path 
                    fill="#34A853" 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  />
                  <path 
                    fill="#FBBC05" 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  />
                  <path 
                    fill="#EA4335" 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  />
                </svg>
              )}
              <span>Connect with Google</span>
            </Button>
            
            <div className="mt-8 rounded-lg border bg-amber-50 p-4">
              <div className="flex items-start space-x-4">
                <AlertCircle className="mt-1 h-5 w-5 text-amber-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-900">Why connect to Search Console?</p>
                  <p className="text-sm text-amber-700">
                    By connecting your Google Search Console account, you can import data directly without
                    manually downloading reports. This ensures you always have the most up-to-date information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Property</label>
              <Select
                value={selectedProperty}
                onValueChange={setSelectedProperty}
                disabled={isLoading || properties.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.siteUrl} value={property.siteUrl}>
                      {property.siteUrl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {properties.length === 0 && !isLoading && (
                <p className="text-sm text-red-500 mt-2">
                  No Search Console properties found for your account
                </p>
              )}
            </div>
            
            {isFetching && (
              <div className="space-y-2 py-4">
                <Progress value={fetchProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Fetching data... {fetchProgress}%
                </p>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
              
              <Button
                onClick={handleFetchReport}
                disabled={isLoading || isFetching || !selectedProperty}
              >
                <Database className="mr-2 h-4 w-4" />
                Fetch Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
