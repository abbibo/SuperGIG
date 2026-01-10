"use client";

import React from "react";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-center py-3 bg-white/80 dark:bg-palette-navy/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
      <Link href="/" aria-label="Supergig Home" className="group relative inline-block">
        {/* Main Text Layer */}
        <span 
          className="relative z-10 block text-3xl md:text-4xl font-black italic tracking-tighter text-[#EA1F38] transform -skew-x-6 transition-all duration-300 ease-in-out"
          style={{
            textShadow: '2px 2px 0px #FFD600, 4px 4px 0px #cf162b, 4px 4px 2px rgba(0,0,0,0.5)',
            fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            WebkitTextStroke: '1px #FFD600'
          }}
        >
          SUPERGIG
        </span>
      </Link>
    </header>
  );
}
