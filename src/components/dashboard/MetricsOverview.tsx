
import { MetricCard } from "@/components/ui-custom/MetricCard";
import { MousePointerClick, BarChart3, Percent, TrendingUp } from "lucide-react";

interface MetricsOverviewProps {
  loading: boolean;
  totalClicks: number;
  totalImpressions: number;
  avgCTR: string;
  avgPosition: string;
}

export const MetricsOverview = ({
  loading,
  totalClicks,
  totalImpressions,
  avgCTR,
  avgPosition
}: MetricsOverviewProps) => {
  return (
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
  );
};
