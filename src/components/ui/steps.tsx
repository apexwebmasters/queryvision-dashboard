
import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  // Count the immediate Step children
  const stepCount = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  ).length;

  // Clone children to inject the step number
  const stepsWithNumbers = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Step) {
      return React.cloneElement(child as React.ReactElement<StepProps>, {
        stepNumber: index + 1,
        totalSteps: stepCount,
      });
    }
    return child;
  });

  return (
    <div className={cn("space-y-4", className)}>
      {stepsWithNumbers}
    </div>
  );
}

export function Step({ 
  title, 
  description, 
  children, 
  className, 
  stepNumber, 
  totalSteps 
}: StepProps & { stepNumber?: number; totalSteps?: number }) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-start gap-4">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
          <div className="z-10 font-medium">{stepNumber}</div>
          {stepNumber !== totalSteps && (
            <div className="absolute top-full h-full w-px bg-border mx-auto left-0 right-0" />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="font-medium leading-none">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children && (
        <div className="ml-12 mt-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}
