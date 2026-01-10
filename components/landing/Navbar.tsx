"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                <span className="material-icons text-white text-2xl">work</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent font-bold text-2xl md:text-3xl tracking-tight">Job</span>
                <span className="text-foreground font-bold text-2xl md:text-3xl tracking-tight">Link</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#jobs" className="text-foreground hover:text-primary text-base font-medium transition-colors">
              Browse Jobs
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary text-base font-medium transition-colors">
              How It Works
            </a>
            <a href="#companies" className="text-foreground hover:text-primary text-base font-medium transition-colors">
              Companies
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold text-base">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" className="font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-icons text-foreground text-2xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#jobs" className="block text-xl font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Browse Jobs
              </a>
              <a href="#how-it-works" className="block text-xl font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </a>
              <a href="#companies" className="block text-xl font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Companies
              </a>
              <hr className="border-border my-4" />
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center text-base py-6">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center text-base py-6 shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
