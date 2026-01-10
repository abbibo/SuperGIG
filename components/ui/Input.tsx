import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-2.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          suppressHydrationWarning
          className={`
            flex h-12 w-full rounded-xl border-2 bg-background 
            px-4 py-3 text-base placeholder:text-muted-foreground
            text-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring
            disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
            ${error ? 'border-destructive focus-visible:ring-destructive' : 'border-input'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.displayName = "Input";
