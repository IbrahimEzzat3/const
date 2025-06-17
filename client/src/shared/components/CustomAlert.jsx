import React, { useEffect, useCallback, useState } from "react";
import { Button } from "../../components/ui";

const CustomAlert = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  showCancelButton = false,
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
  icon = null,
  showInput = false,
  inputType = "text",
  inputPlaceholder = "",
  inputValidation = null,
  initialInputValue = "",
}) => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [inputError, setInputError] = useState(null);

  // Handle escape key press
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setInputValue(initialInputValue); // Reset input value on open
      setInputError(null); // Clear input error on open
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape, initialInputValue]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirmClick = () => {
    if (showInput && inputValidation) {
      const error = inputValidation(inputValue);
      if (error) {
        setInputError(error);
        return; // Prevent closing if there's an input error
      }
    }
    onConfirm?.(inputValue);
    onClose();
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />

      {/* Alert */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          {/* Icon */}
          <div
            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getIconColor()}`}
          >
            {icon || getDefaultIcon()}
          </div>

          {/* Content */}
          <div className="mt-3 text-center">
            <h3
              id="alert-title"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </h3>
            {message && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            )}
            {showInput && (
              <div className="mt-4">
                <input
                  type={inputType}
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null); // Clear error on change
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                />
                {inputError && (
                  <p className="text-red-500 text-sm mt-1">{inputError}</p>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-3">
            {showCancelButton && (
              <Button
                variant="secondary"
                onClick={() => {
                  onCancel?.();
                  onClose();
                }}
              >
                {cancelButtonText}
              </Button>
            )}
            <Button
              variant={
                type === "error"
                  ? "danger"
                  : type === "success"
                  ? "success"
                  : "primary"
              }
              onClick={handleConfirmClick}
            >
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
