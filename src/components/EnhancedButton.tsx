import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

interface EnhancedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const EnhancedButton = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button"
}: EnhancedButtonProps) => {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary-glow))] active:scale-95",
    secondary: "bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground hover:scale-105 active:scale-95 border border-white/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95",
    ghost: "text-foreground hover:bg-primary/10 hover:text-primary active:scale-95"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <LoadingSpinner size={size === "lg" ? "md" : "sm"} />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className={iconSizes[size]} />
          )}
          <span>{children}</span>
          {Icon && iconPosition === "right" && (
            <Icon className={iconSizes[size]} />
          )}
        </>
      )}
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  );
};

export default EnhancedButton;