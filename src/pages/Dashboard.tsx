
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { generateOverviewData } from "@/utils/dataGenerator";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData(generateOverviewData());
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate totals and changes
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalImpressions = data.reduce((sum, item) => sum + item.impressions, 0);
  const avgCTR = data.length > 0 
    ? (data.reduce((sum, item) => sum + parseFloat(item.ctr), 0) / data.length).toFixed(2) 
    : "0";
  const avgPosition = data.length > 0 
    ? (data.reduce((sum, item) => sum + parseFloat(item.position), 0) / data.length).toFixed(1) 
    : "0";
  
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Metrics Overview */}
      <MetricsOverview
        loading={loading}
        totalClicks={totalClicks}
        totalImpressions={totalImpressions}
        avgCTR={avgCTR}
        avgPosition={avgPosition}
      />
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clicks">Clicks</TabsTrigger>
          <TabsTrigger value="impressions">Impressions</TabsTrigger>
          <TabsTrigger value="ctr">CTR</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <PerformanceCharts loading={loading} data={data} />
        </TabsContent>
        
        <TabsContent value="clicks">
          <Card>
            <CardHeader>
              <CardTitle>Clicks</CardTitle>
              <CardDescription>Detailed click performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Clicks chart would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impressions">
          <Card>
            <CardHeader>
              <CardTitle>Impressions</CardTitle>
              <CardDescription>Detailed impression data</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Impressions chart would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ctr">
          <Card>
            <CardHeader>
              <CardTitle>Click-Through Rate</CardTitle>
              <CardDescription>CTR analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {/* CTR chart would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="position">
          <Card>
            <CardHeader>
              <CardTitle>Average Position</CardTitle>
              <CardDescription>Position ranking data</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Position chart would go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
