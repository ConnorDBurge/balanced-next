import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, headerAction, children, className }: SectionCardProps) {
  return (
    <div className={cn("rounded-lg border border-border", className)}>
      {title && (
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          {headerAction}
        </div>
      )}
      <div className="p-4 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
