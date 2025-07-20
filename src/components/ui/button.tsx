import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground hover:scale-110 hover:shadow-neon focus:scale-110 focus:shadow-neon transition-all duration-300 relative overflow-hidden",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-110 focus:scale-110 transition-all duration-300 relative overflow-hidden",
        outline:
          "border border-primary/20 bg-glass hover:bg-primary/10 hover:border-primary/40 hover:scale-110 focus:scale-110 transition-all duration-300 relative overflow-hidden",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground hover:scale-110 hover:shadow-neon focus:scale-110 focus:shadow-neon transition-all duration-300 relative overflow-hidden",
        ghost: "hover:bg-primary/10 hover:text-primary hover:scale-110 focus:scale-110 transition-all duration-300 relative overflow-hidden",
        link: "text-primary underline-offset-4 hover:underline hover:scale-110 focus:scale-110 transition-all duration-300 relative overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        {/* Shimmer effect overlay for primary/secondary */}
        {(variant === "default" || variant === "secondary") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
