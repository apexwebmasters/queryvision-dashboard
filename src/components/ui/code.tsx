
import { cn } from "@/lib/utils";

interface CodeProps {
  children: string | React.ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  return (
    <pre className={cn(
      "p-4 rounded-md bg-secondary/50 overflow-x-auto text-sm font-mono",
      className
    )}>
      <code>{children}</code>
    </pre>
  );
}
