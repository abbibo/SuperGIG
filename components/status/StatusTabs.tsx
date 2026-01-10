"use client";

import { motion } from "framer-motion";

interface StatusTabsProps {
  activeTab: "submissions" | "gigs";
  onChange: (tab: "submissions" | "gigs") => void;
}

export function StatusTabs({ activeTab, onChange }: StatusTabsProps) {
  return (
    <div className="w-full p-1 bg-white border border-gray-200 rounded-xl mb-6 flex relative">
      <button
        onClick={() => onChange("submissions")}
        className={`flex-1 relative py-2.5 text-sm font-medium transition-colors z-10 ${
          activeTab === "submissions" ? "text-white" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Submission
        {activeTab === "submissions" && (
          <motion.div
            layoutId="status-tab-bg"
            className="absolute inset-0 bg-blue-500 rounded-lg -z-10 shadow-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button
        onClick={() => onChange("gigs")}
        className={`flex-1 relative py-2.5 text-sm font-medium transition-colors z-10 ${
          activeTab === "gigs" ? "text-white" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Gigs
        {activeTab === "gigs" && (
          <motion.div
            layoutId="status-tab-bg"
            className="absolute inset-0 bg-blue-500 rounded-lg -z-10 shadow-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
}
