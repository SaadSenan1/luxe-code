import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variants = {
  primary:
    "bg-text-primary text-bg-primary hover:opacity-80 border border-transparent",
  secondary:
    "bg-surface text-primary-color hover:bg-raised border border-color",
  outline:
    "bg-transparent text-primary-color border border-color hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent text-secondary-color hover:text-primary-color hover:bg-raised border border-transparent",
  gold: "gradient-gold text-obsidian-900 font-medium border border-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-xs tracking-widest",
  lg: "px-8 py-4 text-sm tracking-widest",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full uppercase transition-all duration-300 font-medium",
          variants[variant],
          sizes[size],
          (disabled || loading) && "opacity-40 cursor-not-allowed",
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </motion.span>
        )}
        <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
