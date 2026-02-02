"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Supergig</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Welcome to Supergig. Please sign in to continue.
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => router.push("/login")}
          className="w-full sm:w-auto"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
