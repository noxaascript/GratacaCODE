import type React from "react";

import { cn } from "@/lib/cn";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
        className,
      )}
      {...props}
    />
  );
}
