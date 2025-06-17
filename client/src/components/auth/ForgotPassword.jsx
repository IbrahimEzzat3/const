import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../shared/services/auth";
import { Button, Input, Card } from "../ui";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setMessage("Password reset instructions have been sent to your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 shadow-soft-xl">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary-900">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
          />

          {error && (
            <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 bg-success-50 text-success-700 rounded-lg text-sm text-center">
              {message}
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Send Reset Instructions
            </Button>

            <Link
              to="/login"
              className="text-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
