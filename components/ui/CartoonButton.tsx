import Link from "next/link";

interface CartoonButtonProps {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  href?: string;
}

export function CartoonButton({
  label,
  color,
  hasHighlight = true,
  disabled = false,
  onClick,
  type = "button",
  isLoading = false,
  href,
}: CartoonButtonProps) {
  // Default to primary blue gradient, use accent green for sign-up buttons
  const isSignUp = label.toLowerCase().includes('sign up') || label.toLowerCase().includes('signup');
  
  // Determine background style
  const getButtonClasses = () => {
    if (color) {
      return color; // Assuming color is passed as a class, e.g., "bg-red-500"
    }
    if (isSignUp) {
      return "bg-accent text-navy hover:bg-accent-hover";
    }
    return "bg-gradient-to-r from-primary-start to-primary-end text-white hover:opacity-90";
  };
  
  const variantClasses = getButtonClasses();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.();
  };
  
  const buttonClasses = `relative h-12 px-6 text-xl rounded-full font-bold border-2 border-navy transition-all duration-150 overflow-hidden group
    hover:shadow-[0_4px_0_0_#252943]
    ${disabled || isLoading ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1 active:translate-y-0 active:shadow-none'}
    ${variantClasses}`;

  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className={`h-4 w-4 animate-spin rounded-full border-2 ${isSignUp && !color ? 'border-navy' : 'border-white'} border-t-transparent inline-block`} />
            {label}
          </span>
        ) : (
          label
        )}
      </span>
      {hasHighlight && !disabled && !isLoading && (
        <div className="absolute top-1/2 left-[-100%] w-16 h-24 bg-white/50 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]"></div>
      )}
    </>
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link href={href} className={`${buttonClasses} inline-block`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`${buttonClasses} inline-block`}
    >
      {content}
    </button>
  );
}

