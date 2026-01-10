"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Handshake, Activity, User } from "lucide-react";
import { motion } from "framer-motion";

export function GlassNav() {
  const pathname = usePathname();

  const tabs = [
    { id: "home", href: "/home", icon: Home, label: "Home" },
    { id: "jobs", href: "/jobs", icon: Handshake, label: "Jobs" },
    { id: "status", href: "/status", icon: Activity, label: "Status" },
    { id: "profile", href: "/profile", icon: User, label: "Profile" },
  ];

  // Helper to determine active state including root path mapping if needed
  const isActive = (path: string) => {
      // Logic could be expanded if /home is technically /dashboard or similar
      if (path === "/home" && (pathname === "/" || pathname === "/home")) return true;
      return pathname?.startsWith(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[350px] px-4">
      <div className="relative flex items-center justify-between bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full p-2 shadow-xl ring-1 ring-black/5">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex items-center justify-center w-16 h-12 rounded-full z-10"
            >
              {active && (
                <motion.div
                  layoutId="glass-nav-pill"
                  className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={`relative flex flex-col items-center gap-0.5 transition-colors duration-200 ${active ? "text-primary font-semibold" : "text-white/70 dark:text-white/50"}`}>
                <tab.icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px]">{tab.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
