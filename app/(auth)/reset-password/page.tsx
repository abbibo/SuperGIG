"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, actionCodeSettings } from "@/lib/firebase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      const errorCode = (err as { code?: string }).code;
      if (errorCode === "auth/user-not-found") {
        // For security reasons, we might not want to reveal if user exists, 
        // but for better UX most apps do show a gentle error or just say "If account exists..."
        // Here we'll just treat it as success to prevent enumeration, or if preferred show error.
        // Let's stick to the secure approach: show success message.
        setSubmitted(true);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
          Reset Password
        </h1>
      </div>

    <Card className="w-full" padding="lg">
      {submitted ? (
        <div className="text-center space-y-4">
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
             <p className="text-green-600 dark:text-green-400 font-medium">
               If an account exists for {email}, we have sent a password reset link.
             </p>
          </div>
          <Link href="/login" className="block w-full">
            <Button variant="outline" className="w-full">Back to Login</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-subtext-light dark:text-subtext-dark text-center mb-4">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          
          <Input 
            id="email" 
            type="email" 
            label="Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
            isLoading={loading}
          >
            Send Reset Link
          </Button>
          
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="text-primary hover:underline font-medium">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </Card>
    </div>
  );
}
