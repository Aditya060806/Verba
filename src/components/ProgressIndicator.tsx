interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive";
  className?: string;
}

const ProgressIndicator = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = "md",
  variant = "primary",
  className = ""
}: ProgressIndicatorProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-primary via-accent to-secondary shadow-neon animate-gradient-move",
    secondary: "bg-gradient-to-r from-secondary to-secondary-dark shadow-neon animate-gradient-move",
    success: "bg-gradient-to-r from-success to-success shadow-neon animate-gradient-move",
    warning: "bg-gradient-to-r from-warning to-warning shadow-neon animate-gradient-move",
    destructive: "bg-gradient-to-r from-destructive to-destructive shadow-neon animate-gradient-move"
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-foreground-secondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;