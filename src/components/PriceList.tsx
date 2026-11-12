"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PriceGroup } from "@/config/types";

/** Kainoraštis su kategorijų skirtukais. */
export function PriceList({ groups, light = false }: { groups: PriceGroup[]; light?: boolean }) {
  const [active, setActive] = useState(groups[0]?.id);
  const group = groups.find((g) => g.id === active) ?? groups[0];

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div role="tablist" aria-label="Kainoraščio kategorijos" className="-mx-4 flex gap-1 overflow-x-auto px-4 md:col-span-4 md:mx-0 md:flex-col md:px-0">
        {groups.map((g, i) => {
          const on = g.id === group.id;
          return (
            <button
              key={g.id}
              role="tab"
              id={`tab-${g.id}`}
              aria-selected={on}
              aria-controls={`panel-${g.id}`}
              onClick={() => setActive(g.id)}
              className={`relative flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors md:py-4 md:text-base ${
                on ? "text-white" : light ? "text-ink/60 hover:text-ink" : "text-white/55 hover:text-white"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="price-tab"
                  className="absolute inset-0 -z-0 bg-red"
                  transition={{ type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
              <span className={`relative font-mono text-[11px] ${on ? "text-white/80" : "text-red"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative whitespace-nowrap">{g.title}</span>
            </button>
          );
        })}
      </div>

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          <motion.ul
            key={group.id}
            role="tabpanel"
            id={`panel-${group.id}`}
            aria-labelledby={`tab-${group.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`border-t ${light ? "border-ink/15" : "border-line"}`}
          >
            {group.items.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
                className={`flex items-baseline gap-4 border-b py-4 ${light ? "border-ink/15" : "border-line"}`}
              >
                <span className="min-w-0">
                  <span className="block font-medium">{item.name}</span>
                  {item.note && <span className={`mt-0.5 block text-xs ${light ? "text-ink/55" : "text-white/50"}`}>{item.note}</span>}
                </span>
                <span aria-hidden className={`mb-1 hidden flex-1 border-b border-dotted sm:block ${light ? "border-ink/25" : "border-white/20"}`} />
                <span className="ml-auto shrink-0 font-mono text-sm font-medium tabular-nums text-red sm:ml-0">{item.price}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
