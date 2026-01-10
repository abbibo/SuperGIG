"use client";

import { useState, Suspense } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { UserService, UserRole } from "@/services/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "seeker";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(initialRole);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if user already exists
      const existing = await UserService.getUser(result.user.uid);
      if (!existing) {
         await UserService.createUser(result.user.uid, result.user.email || "", role);
      } else {
         // If they already exist, we might want to warn them or just log them in?
         // For now, simple redirect
      }

      if (role === "creator") {
        router.push("/creator");
      } else {
        router.push("/seeker");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to register with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await UserService.createUser(userCredential.user.uid, email, role);
      
      // Redirect based on role
      if (role === "creator") {
        router.push("/creator");
      } else {
        router.push("/seeker");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
          We Say Hello!
        </h1>
        <p className="text-base text-subtext-light dark:text-subtext-dark">
          Create your account to get started.
        </p>
      </div>

      <Card className="w-full" padding="lg">
        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-text-light dark:text-text-dark mb-3">
            I am a
          </p>
          <div className="flex gap-3">
            <button 
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                role === 'seeker' 
                  ? 'bg-gradient-to-r from-primary-start to-primary-end text-white border-primary shadow-md' 
                  : 'bg-transparent border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-primary/50'
              }`}
              onClick={() => setRole("seeker")}
            >
              Job Seeker
            </button>
            <button 
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                role === 'creator' 
                  ? 'bg-gradient-to-r from-primary-start to-primary-end text-white border-primary shadow-md' 
                  : 'bg-transparent border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-primary/50'
              }`}
              onClick={() => setRole("creator")}
            >
              Job Creator
            </button>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="mb-6">
          <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark mb-4 text-center">
            Or Sign Up With
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-12 h-12 rounded-full border-2 border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <Input 
            id="email" 
            type="email" 
            label="Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input 
            id="password" 
            type="password" 
            label="Create Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
          <Input 
            id="confirmPassword" 
            type="password" 
            label="Re-type Password" 
            required 
            placeholder="Confirm your password"
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          <div className="w-full flex justify-center">
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
              isLoading={loading}
              className="w-full font-bold text-lg"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-subtext-light dark:text-subtext-dark">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
