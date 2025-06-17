import React from "react";
import { twMerge } from "tailwind-merge";

const Card = React.forwardRef(
  (
    {
      children,
      className = "",
      variant = "default",
      hoverable = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-white",
      primary: "bg-primary-50",
      secondary: "bg-secondary-50",
      dark: "bg-secondary-900 text-white",
    };

    const baseStyles = "rounded-xl shadow-soft-xl transition-all duration-200";
    const hoverStyles = hoverable
      ? "hover:shadow-soft-2xl hover:-translate-y-1"
      : "";

    const cardClasses = twMerge(
      baseStyles,
      variants[variant],
      hoverStyles,
      className
    );

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

const CardHeader = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "px-6 py-4 border-b border-secondary-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardBody = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge("px-6 py-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

const CardFooter = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "px-6 py-4 border-t border-secondary-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardBody.displayName = "Card.Body";
CardFooter.displayName = "Card.Footer";

export default Card;
