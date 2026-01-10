"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, userRole, signOut } = useAuth();

  return (
    <header className="border-b border-border-light dark:border-border-dark bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">Job</span>
            <span className="text-text-light dark:text-text-dark">Link</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/jobs" className="text-base font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
              Browse Jobs
            </Link>
            
            {user ? (
              <>
                {userRole === "creator" && (
                   <Link href="/creator" className="text-base font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
                     Dashboard
                   </Link>
                )}
                {userRole === "admin" && (
                   <Link href="/admin" className="text-base font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
                     Admin
                   </Link>
                )}
                {userRole === "seeker" && (
                   <Link href="/seeker" className="text-base font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
                     Dashboard
                   </Link>
                )}
                
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border-light dark:border-border-dark">
                   <span className="text-sm text-subtext-light dark:text-subtext-dark hidden md:inline-block">
                      {user.email}
                   </span>
                   <Button variant="ghost" onClick={() => signOut()} size="sm">
                     Sign Out
                   </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
