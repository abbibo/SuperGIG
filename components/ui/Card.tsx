import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
}

export function Card({ className = "", children, padding = "md", ...props }: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  return (
    <div className={`card ${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
}
