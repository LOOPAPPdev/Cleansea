"use client";
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export type SegmentedTab = { label: string; content: ReactNode };

/**
 * Segmented tabs (LOOP-CMP-021), as in the approved reference: equal-width tabs, the active one is a
 * gray pill with black text, the others use subtle text. Base UI Tabs: arrow keys move, Home/End jump,
 * aria-selected and tabpanel wiring built in.
 */
export function SegmentedTabs({ tabs, label, defaultIndex = 0 }: { tabs: SegmentedTab[]; label: string; defaultIndex?: number }) {
  return (
    <Tabs defaultValue={String(defaultIndex)} className="gap-6">
      <TabsList aria-label={label} className="grid h-auto w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-1 rounded-pill bg-transparent p-0">
        {tabs.map((t, i) => (
          <TabsTrigger
            key={t.label}
            value={String(i)}
            className="h-11 rounded-pill border-0 px-4 text-[0.9375rem] font-medium text-subtle-foreground shadow-none hover:text-foreground data-active:bg-surface-sunken data-active:text-foreground data-active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t, i) => (
        <TabsContent key={t.label} value={String(i)} className="text-base">
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
