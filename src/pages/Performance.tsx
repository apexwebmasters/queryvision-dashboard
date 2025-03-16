
import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for performance charts
const generateDeviceData = () => {
  return [
    { name: "Desktop", value: Math.floor(Math.random() * 60) + 30 },
    { name: "Mobile", value: Math.floor(Math.random() * 40) + 20 },
    { name: "Tablet", value: Math.floor(Math.random() * 20) + 5 },
  ];
};

const generateCountryData = () => {
  return [
    { name: "United States", value: Math.floor(Math.random() * 1000) + 500 },
    { name: "United Kingdom", value: Math.floor(Math.random() * 500) + 300 },
    { name: "Canada", value: Math.floor(Math.random() * 300) + 200 },
    { name: "Australia", value: Math.floor(Math.random() * 200) + 150 },
    { name: "Germany", value: Math.floor(Math.random() * 200) + 100 },
    { name: "France", value: Math.floor(Math.random() * 150) + 80 },
    { name: "India", value: Math.floor(Math.random() * 150) + 70 },
    { name: "Brazil", value: Math.floor(Math.random() * 100) + 50 },
  ];
};

const generateTrendData = () => {
  const data = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 0; i < 12; i++) {
    data.push({
      name: months[i],
      clicks: Math.floor(Math.random() * 1000) + 500,
      impressions: Math.floor(Math.random() * 10000) + 3000,
    });
  }
  
  return data;
};

// Colors for the charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0", "#59C4E6", "#EA7CCC"];

export default function Performance() {
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDeviceData(generateDeviceData());
      setCountryData(generateCountryData());
      setTrendData(generateTrendData());
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const totalClicks = trendData.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalImpressions = trendData.reduce((acc, curr) => acc + curr.impressions, 0);
  
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance by Device</CardTitle>
            <CardDescription>Click distribution across different devices</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 w-full flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} clicks`, 'Clicks']}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Performance by geographic location</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 w-full flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={countryData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    width={70}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    name="Clicks"
                    radius={[0, 4, 4, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Year-to-date clicks and impressions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-80 w-full flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <Tabs defaultValue="combined" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="combined">Combined</TabsTrigger>
                <TabsTrigger value="clicks">Clicks</TabsTrigger>
                <TabsTrigger value="impressions">Impressions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="combined">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Total Clicks</div>
                    <div className="mt-1 text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Total Impressions</div>
                    <div className="mt-1 text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="clicks" 
                      name="Clicks"
                      stroke="hsl(var(--primary))" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="impressions" 
                      name="Impressions"
                      stroke="hsl(var(--accent-foreground))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="clicks">
                <div className="mb-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Total Clicks</div>
                    <div className="mt-1 text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="clicks" 
                      name="Clicks"
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="impressions">
                <div className="mb-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Total Impressions</div>
                    <div className="mt-1 text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="impressions" 
                      name="Impressions"
                      fill="hsl(var(--accent-foreground))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
