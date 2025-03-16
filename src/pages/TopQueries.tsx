
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTable } from "@/components/ui-custom/StatTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define query data types
interface Query {
  id: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
  change: number;
}

// Generate mock data for top queries
const generateQueryData = (): Query[] => {
  const queries = [
    "wordpress themes",
    "responsive design",
    "web development",
    "javascript tutorial",
    "css layout",
    "react hooks",
    "tailwind css",
    "web design inspiration",
    "seo optimization",
    "mobile app development",
    "ux design principles",
    "php frameworks",
    "html5 templates",
    "website builder",
    "angular vs react",
    "front-end development",
    "web accessibility",
    "graphic design tools",
    "nodejs tutorial",
    "ecommerce platforms",
    "wordpress plugins",
    "user interface design",
    "css grid",
    "progressive web apps",
    "vue.js tutorial",
    "typography in web design",
    "javascript frameworks",
    "bootstrap templates",
    "website performance",
    "responsive images",
  ];

  return queries.map((query, index) => ({
    id: `q-${index + 1}`,
    query,
    clicks: Math.floor(Math.random() * 500) + 10,
    impressions: Math.floor(Math.random() * 10000) + 500,
    ctr: (Math.random() * 10 + 0.5).toFixed(2) + "%",
    position: (Math.random() * 30 + 1).toFixed(1),
    change: Math.floor(Math.random() * 40) - 20,
  }));
};

export default function TopQueries() {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setQueries(generateQueryData());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Define columns for the queries table
  const columns: ColumnDef<Query>[] = [
    {
      accessorKey: "query",
      header: "Query",
      cell: ({ row }) => {
        const query = row.original;
        return (
          <div className="font-medium max-w-[300px] truncate">{query.query}</div>
        );
      },
    },
    {
      accessorKey: "clicks",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Clicks
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">{row.original.clicks.toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "impressions",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Impressions
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">{row.original.impressions.toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "ctr",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CTR
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.ctr}</div>;
      },
    },
    {
      accessorKey: "position",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Position
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.position}</div>;
      },
    },
    {
      accessorKey: "change",
      header: "Change",
      cell: ({ row }) => {
        const change = row.original.change;
        return (
          <div className="text-right">
            <Badge 
              variant="outline" 
              className={
                change > 0 
                  ? "bg-green-50 text-green-600 border-green-200" 
                  : change < 0 
                  ? "bg-red-50 text-red-600 border-red-200" 
                  : "bg-gray-50 text-gray-600 border-gray-200"
              }
            >
              {change > 0 ? "+" : ""}{change}%
            </Badge>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      <Card>
        <CardHeader>
          <CardTitle>Top Search Queries</CardTitle>
          <CardDescription>
            Analysis of your best performing search queries from Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 w-full flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <StatTable columns={columns} data={queries} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
