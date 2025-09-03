"use client";
import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border border-black/10">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="w-full text-left p-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-between">
          <span>{title}</span>
          <span className={cn("transition", open ? "rotate-45" : "")}>＋</span>
        </Collapsible.Trigger>
        <Collapsible.Content className="px-4 pb-4 text-sm text-slate-700">
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

