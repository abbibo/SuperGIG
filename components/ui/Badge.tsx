import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  let variantClasses = "";
  
  if (variant === "success") {
    variantClasses = "bg-accent text-navy";
  } else if (variant === "warning") {
    variantClasses = "bg-yellow-600 text-white";
  } else if (variant === "destructive") {
    variantClasses = "bg-destructive text-white";
  } else if (variant === "outline") {
    variantClasses = "border border-primary text-primary bg-transparent";
  } else {
    // Default variant uses primary blue
    variantClasses = "bg-gradient-to-r from-primary-start to-primary-end text-white";
  }

  // Removed inline styles in favor of utility classes

  return (
    <span 
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
