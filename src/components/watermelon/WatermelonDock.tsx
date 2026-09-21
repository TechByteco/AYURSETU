"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  Building2,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DockItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "home", name: "Overview", href: "/", icon: Home },
  { id: "ayursetu", name: "AYURSETU Portal", href: "/ayursetu", icon: Sparkles, badge: "AI" },
  { id: "colleges", name: "Ayush Colleges", href: "/colleges", icon: Building2 },
  { id: "verify", name: "Verify AUSID", href: "/verify", icon: ShieldCheck },
  { id: "opportunities", name: "Vacancies", href: "/opportunities", icon: Briefcase },
  { id: "logbook", name: "e-Logbook", href: "/logbook", icon: BookOpen },
  { id: "design", name: "Design System", href: "/design-system", icon: Palette },
];

export function WatermelonDock() {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 25 }}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20"
      >
        {DOCK_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredId === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group p-1"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-colors duration-200",
                  isActive
                    ? "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-900/50"
                    : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800/90 border border-white/5"
                )}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />

                {item.badge && (
                  <span className="absolute -top-1 -right-1 px-1 text-[9px] font-bold rounded-full bg-amber-500 text-zinc-950 shadow-sm">
                    {item.badge}
                  </span>
                )}
              </motion.div>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeDockDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-xl pointer-events-none"
                  >
                    {item.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
