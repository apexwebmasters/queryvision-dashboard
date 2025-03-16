
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTable } from "@/components/ui-custom/StatTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define keyword data types
interface Keyword {
  id: string;
  query: string;
  currentPosition: number;
  previousPosition: number;
  change: number;
  impressions: number;
  clicks: number;
  ctr: string;
  priority: "high" | "medium" | "low";
}

// Generate mock data for declining keywords
const generateDecliningKeywordsData = (): Keyword[] => {
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
  ];

  return queries.map((query, index) => {
    const currentPosition = Math.floor(Math.random() * 20) + 11;
    const previousPosition = Math.floor(Math.random() * 10) + 1;
    const change = previousPosition - currentPosition;
    const impressions = Math.floor(Math.random() * 5000) + 100;
    const clicks = Math.floor(Math.random() * 200) + 10;
    const ctr = ((clicks / impressions) * 100).toFixed(2) + "%";
    
    let priority: "high" | "medium" | "low";
    if (change < -5) {
      priority = "high";
    } else if (change < -3) {
      priority = "medium";
    } else {
      priority = "low";
    }

    return {
      id: `dk-${index + 1}`,
      query,
      currentPosition,
      previousPosition,
      change,
      impressions,
      clicks,
      ctr,
      priority
    };
  });
};

export default function DecliningKeywords() {
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setKeywords(generateDecliningKeywordsData());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Define columns for the keywords table
  const columns: ColumnDef<Keyword>[] = [
    {
      accessorKey: "query",
      header: "Keyword",
      cell: ({ row }) => {
        const keyword = row.original;
        return (
          <div className="font-medium max-w-[300px] truncate">{keyword.query}</div>
        );
      },
    },
    {
      accessorKey: "previousPosition",
      header: "Previous Pos.",
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.previousPosition}</div>;
      },
    },
    {
      accessorKey: "currentPosition",
      header: "Current Pos.",
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.currentPosition}</div>;
      },
    },
    {
      accessorKey: "change",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Position Change
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        const change = row.original.change;
        return (
          <div className="text-right">
            <Badge 
              variant="outline" 
              className="bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
            >
              {change}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "impressions",
      header: "Impressions",
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">{row.original.impressions.toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "clicks",
      header: "Clicks",
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.clicks.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "ctr",
      header: "CTR",
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.original.ctr}</div>;
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.original.priority;
        const priorityColors = {
          high: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
          medium: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
          low: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
        };
        
        return (
          <div className="text-right">
            <Badge 
              variant="outline" 
              className={priorityColors[priority]}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      <Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>
          These keywords have lost ranking positions in the last 30 days. Consider optimizing these pages.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Declining Keywords</CardTitle>
          <CardDescription>
            Keywords that have dropped in search rankings from the previous period
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 w-full flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <StatTable columns={columns} data={keywords} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
