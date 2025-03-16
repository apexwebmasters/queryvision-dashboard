
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/ui-custom/MetricCard";
import { BarChart3, MousePointerClick, Percent, TrendingUp } from "lucide-react";

// Mock data
const generateOverviewData = () => {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 10000) + 1000,
      ctr: (Math.random() * 5 + 1).toFixed(2),
      position: (Math.random() * 20 + 1).toFixed(1),
    });
  }
  
  return data;
};

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
  
  // Calculate totals and changes (mock data)
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Clicks"
          value={loading ? "-" : totalClicks.toLocaleString()}
          change={8.2}
          loading={loading}
          variant="positive"
          icon={<MousePointerClick className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Impressions"
          value={loading ? "-" : totalImpressions.toLocaleString()}
          change={5.1}
          loading={loading}
          variant="neutral"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <MetricCard
          title="Average CTR"
          value={`${loading ? "-" : avgCTR}%`}
          change={-2.3}
          loading={loading}
          variant="negative"
          icon={<Percent className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Position"
          value={loading ? "-" : avgPosition}
          change={1.4}
          loading={loading}
          variant="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clicks">Clicks</TabsTrigger>
          <TabsTrigger value="impressions">Impressions</TabsTrigger>
          <TabsTrigger value="ctr">CTR</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clicks & Impressions</CardTitle>
                <CardDescription>30-day overview of search performance</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                {loading ? (
                  <div className="h-80 w-full flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        minTickGap={15}
                      />
                      <YAxis 
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, 'dataMax']}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), '']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      />
                      <Bar 
                        yAxisId="left" 
                        dataKey="clicks" 
                        name="Clicks" 
                        fill="url(#colorClicks)" 
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                      />
                      <Line 
                        yAxisId="right" 
                        dataKey="impressions" 
                        name="Impressions" 
                        type="monotone" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>CTR & Position</CardTitle>
                <CardDescription>30-day trend analysis</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                {loading ? (
                  <div className="h-80 w-full flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        minTickGap={15}
                      />
                      <YAxis 
                        yAxisId="left"
                        domain={[0, 10]}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[1, 20]}
                        reversed
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        formatter={(value: string, name: string) => {
                          return name === "CTR" ? [`${value}%`, name] : [value, name];
                        }}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      />
                      <Line 
                        yAxisId="left" 
                        dataKey="ctr" 
                        name="CTR" 
                        type="monotone" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        yAxisId="right" 
                        dataKey="position" 
                        name="Position" 
                        type="monotone" 
                        stroke="hsl(var(--accent-foreground))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clicks">
          {/* Content for clicks tab */}
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
          {/* Content for impressions tab */}
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
          {/* Content for CTR tab */}
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
          {/* Content for position tab */}
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
