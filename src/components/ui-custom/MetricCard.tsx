
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const metricCardVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
        positive: "border-green-100 dark:border-green-900",
        negative: "border-red-100 dark:border-red-900",
        neutral: "border-blue-100 dark:border-blue-900",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  description,
  change,
  icon,
  variant,
  loading = false,
  className,
  ...props
}: MetricCardProps) {
  const getChangeColor = () => {
    if (!change || change === 0) return "text-gray-500";
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  const getChangeIcon = () => {
    if (!change || change === 0) return <Minus className="h-4 w-4" />;
    return change > 0 ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        metricCardVariants({ variant, className })
      )} 
      {...props}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <div className="mt-1 flex items-center text-xs">
              {change !== undefined && (
                <span className={cn("flex items-center gap-1 font-medium", getChangeColor())}>
                  {getChangeIcon()}
                  {Math.abs(change)}%
                </span>
              )}
              {description && (
                <CardDescription className="ml-2 text-xs">
                  {description}
                </CardDescription>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
