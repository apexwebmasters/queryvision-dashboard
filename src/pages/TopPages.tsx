
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTable } from "@/components/ui-custom/StatTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define page data types
interface Page {
  id: string;
  url: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
  change: number;
}

// Generate mock data for top pages
const generatePageData = (): Page[] => {
  const pages = [
    { url: "/", title: "Home" },
    { url: "/blog", title: "Blog" },
    { url: "/about", title: "About Us" },
    { url: "/services", title: "Services" },
    { url: "/contact", title: "Contact" },
    { url: "/products", title: "Products" },
    { url: "/pricing", title: "Pricing" },
    { url: "/portfolio", title: "Portfolio" },
    { url: "/resources", title: "Resources" },
    { url: "/team", title: "Our Team" },
    { url: "/faq", title: "FAQ" },
    { url: "/blog/web-design-trends-2023", title: "Web Design Trends 2023" },
    { url: "/blog/seo-best-practices", title: "SEO Best Practices" },
    { url: "/blog/responsive-design-guide", title: "Responsive Design Guide" },
    { url: "/resources/ebooks", title: "Free E-Books" },
    { url: "/resources/templates", title: "Templates" },
    { url: "/services/web-development", title: "Web Development" },
    { url: "/services/seo", title: "SEO Services" },
    { url: "/services/design", title: "Design Services" },
    { url: "/case-studies", title: "Case Studies" },
    { url: "/testimonials", title: "Testimonials" },
    { url: "/partners", title: "Partners" },
    { url: "/blog/wordpress-optimization", title: "WordPress Optimization Tips" },
    { url: "/blog/content-strategy", title: "Content Strategy Guide" },
    { url: "/blog/ui-design-principles", title: "UI Design Principles" },
  ];

  return pages.map((page, index) => ({
    id: `p-${index + 1}`,
    url: page.url,
    title: page.title,
    clicks: Math.floor(Math.random() * 1000) + 50,
    impressions: Math.floor(Math.random() * 15000) + 800,
    ctr: (Math.random() * 15 + 1).toFixed(2) + "%",
    position: (Math.random() * 20 + 1).toFixed(1),
    change: Math.floor(Math.random() * 50) - 25,
  }));
};

export default function TopPages() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPages(generatePageData());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Define columns for the pages table
  const columns: ColumnDef<Page>[] = [
    {
      accessorKey: "title",
      header: "Page",
      cell: ({ row }) => {
        const page = row.original;
        return (
          <div>
            <div className="font-medium">{page.title}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              {page.url}
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="ml-1 text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
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
          <CardTitle>Top Performing Pages</CardTitle>
          <CardDescription>
            Analysis of your best performing pages from Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 w-full flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <StatTable columns={columns} data={pages} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
