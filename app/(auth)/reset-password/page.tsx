"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // specific firebase logic: sendPasswordResetEmail(auth, email)
    setSubmitted(true);
  };

  return (
    <Card className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      {submitted ? (
        <div className="text-center space-y-4">
          <p className="text-green-600">If an account exists for {email}, we have sent a password reset link.</p>
          <Link href="/login">
            <Button variant="outline" className="w-full">Back to Login</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted text-center mb-4">
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
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </Card>
  );
}
