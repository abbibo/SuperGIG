"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background font-display min-h-screen text-foreground antialiased transition-colors duration-300">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t-2 border-border px-6 py-4 flex justify-around items-center z-50 md:hidden shadow-lg">
        <button className="flex flex-col items-center gap-1.5 text-primary transition-transform active:scale-95">
          <span className="material-icons text-2xl">home</span>
          <span className="text-[11px] font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all active:scale-95">
          <span className="material-icons text-2xl">search</span>
          <span className="text-[11px] font-medium">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all active:scale-95">
          <span className="material-icons text-2xl">bookmark_border</span>
          <span className="text-[11px] font-medium">Favorites</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all active:scale-95">
          <span className="material-icons text-2xl">person_outline</span>
          <span className="text-[11px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
