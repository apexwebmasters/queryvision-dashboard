
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PerformanceChartsProps {
  loading: boolean;
  data: any[];
}

export const PerformanceCharts = ({ loading, data }: PerformanceChartsProps) => {
  const LoadingSpinner = () => (
    <div className="h-80 w-full flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Clicks & Impressions</CardTitle>
          <CardDescription>30-day overview of search performance</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          {loading ? (
            <LoadingSpinner />
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
            <LoadingSpinner />
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
  );
};
