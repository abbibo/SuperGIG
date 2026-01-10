"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { UserCircle, LogOut } from "lucide-react";
import Link from "next/link";

export function MobileHeader({ title }: { title?: string }) {
    const { user, signOut } = useAuth();

    return (
        <header className="sticky top-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark z-50 px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <Link href="/" className="font-bold text-lg bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                    {title || "JobLink"}
                 </Link>
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                   <div className="flex items-center gap-3">
                        <button 
                            onClick={() => signOut()} 
                            className="text-subtext-light dark:text-subtext-dark hover:text-destructive transition-colors"
                            aria-label="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center border border-border-light dark:border-border-dark">
                             <UserCircle size={20} className="text-subtext-light dark:text-subtext-dark" />
                        </div>
                   </div>
                ) : (
                    <Link href="/login">
                        <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                            Log In
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
}
