import React from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "border-primary-200 border-t-primary-600",
  secondary: "border-secondary-200 border-t-secondary-600",
  white: "border-white/20 border-t-white",
  dark: "border-secondary-700 border-t-secondary-900",
};

const sizes = {
  xs: "h-3 w-3 border-2",
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
  xl: "h-16 w-16 border-4",
};

const LoadingSpinner = ({
  size = "md",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = "animate-spin rounded-full";

  const spinnerClasses = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
