import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl border border-black/10 bg-white px-3 py-1 text-xs font-medium shadow-hair",
        className
      )}
      {...props}
    />
  );
}

