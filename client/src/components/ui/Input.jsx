import React from "react";
import { twMerge } from "tailwind-merge";

const Input = React.forwardRef(
  (
    { label, error, helperText, leftIcon, rightIcon, className = "", ...props },
    ref
  ) => {
    const baseStyles =
      "block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
    const stateStyles = error
      ? "border-error-300 bg-error-50 text-error-900 placeholder-error-300"
      : "border-secondary-300 bg-white text-secondary-900 placeholder-secondary-400 hover:border-primary-400";
    const paddingStyles =
      leftIcon && rightIcon
        ? "pl-10 pr-10"
        : leftIcon
        ? "pl-10 pr-4"
        : rightIcon
        ? "pl-4 pr-10"
        : "px-4";

    const inputClasses = twMerge(
      baseStyles,
      stateStyles,
      paddingStyles,
      "py-2.5",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? "text-error-600" : "text-secondary-500"
            }`}
            id={error ? `${props.id}-error` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
