"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export function BottomNav() {
  const pathname = usePathname();
  const { user, userRole } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-16">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive("/") ? "text-primary" : "text-subtext-light dark:text-subtext-dark"}`}
        >
          <Home size={24} strokeWidth={isActive("/") ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link 
          href="/jobs" 
          className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive("/jobs") ? "text-primary" : "text-subtext-light dark:text-subtext-dark"}`}
        >
          <Search size={24} strokeWidth={isActive("/jobs") ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Jobs</span>
        </Link>
        
        {user && (
            <Link 
                href={userRole === "creator" ? "/creator" : "/seeker"} 
                className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive(userRole === "creator" ? "/creator" : "/seeker") ? "text-primary" : "text-subtext-light dark:text-subtext-dark"}`}
            >
                <LayoutDashboard size={24} strokeWidth={isActive(userRole === "creator" ? "/creator" : "/seeker") ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Dashboard</span>
            </Link>
        )}
        
        <Link 
          href={user ? "#" : "/login"} 
          className={`flex flex-col items-center gap-1 min-w-[64px] ${pathname === "/profile" ? "text-primary" : "text-subtext-light dark:text-subtext-dark"}`}
        >
             <User size={24} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
             <span className="text-[10px] font-medium">{user ? "Profile" : "Login"}</span>
        </Link>
      </div>
    </div>
  );
}
