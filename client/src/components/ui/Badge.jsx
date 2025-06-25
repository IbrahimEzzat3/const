import React from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-primary-100 text-primary-800",
  secondary: "bg-secondary-100 text-secondary-800",
  success: "bg-success-100 text-success-800",
  error: "bg-error-100 text-error-800",
  warning: "bg-warning-100 text-warning-800",
  info: "bg-primary-50 text-primary-700",
  gold: "bg-accent-gold text-white",
  green: "bg-accent-green text-white",
  teal: "bg-accent-teal text-white",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

const Badge = React.forwardRef(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      dot = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";

    const badgeClasses = twMerge(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {dot && (
          <span className="mr-1.5 h-2 w-2 rounded-full bg-current opacity-75" />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
