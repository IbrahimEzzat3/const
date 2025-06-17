import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authService } from "../../shared/services/auth";
import { Button, Input, Card } from "../ui";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setError("Invalid reset link: Token missing from URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, formData.password);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
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
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="password"
              name="password"
              type="password"
              label="New Password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              className="w-full"
            />
          </div>

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
              Reset Password
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

export default ResetPassword;
