import React from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "../common/LoadingSpinner";

const variants = {
  primary:
    "bg-primary-600 hover:bg-primary-700 text-white shadow-soft-xl hover:shadow-soft-2xl",
  secondary: "bg-secondary-100 hover:bg-secondary-200 text-secondary-900",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  ghost: "text-primary-600 hover:bg-primary-50",
  danger: "bg-error-600 hover:bg-error-700 text-white",
  success: "bg-success-600 hover:bg-success-700 text-white",
  gold: "bg-accent-gold hover:bg-accent-gold/90 text-white shadow-soft-xl hover:shadow-soft-2xl",
  green:
    "bg-accent-green hover:bg-accent-green/90 text-white shadow-soft-xl hover:shadow-soft-2xl",
  teal: "bg-accent-teal hover:bg-accent-teal/90 text-white shadow-soft-xl hover:shadow-soft-2xl",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const Button = React.forwardRef(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in";
    const widthStyles = fullWidth ? "w-full" : "";

    const buttonClasses = twMerge(
      baseStyles,
      variants[variant],
      sizes[size],
      widthStyles,
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
