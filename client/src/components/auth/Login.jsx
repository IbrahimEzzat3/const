import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button, Input, Card } from "../ui";
import { format } from "date-fns";

const Login = () => {
  const { login } = useAuth();
  const { t, language, direction } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getBlockMessage = (blockInfo) => {
    const { reason, expiresAt } = blockInfo;
    const formattedExpiresAt =
      expiresAt === "permanent"
        ? t("loginPage.permanentBlock")
        : t("loginPage.blockExpiresAt", {
            date: format(new Date(expiresAt), "MMM dd, yyyy HH:mm"),
          });

    let message = t("loginPage.accountBlocked");
    if (reason) {
      message += ` (${t("common.reason")}: ${reason})`;
    }
    message += ` - ${formattedExpiresAt}`;

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError(t("loginPage.enterBothFields"));
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (!result || result.success === false) {
        // Handle blocked user response
        if (result?.blockInfo) {
          throw new Error(getBlockMessage(result.blockInfo));
        }
        // Clear password field on error
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
        throw new Error(result?.error || t("loginPage.invalidCredentials"));
      }

      // Only navigate if login was successful
      if (result.user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      // Prevent any navigation on error
      setIsLoading(false);
      e.preventDefault();
      setError(err.message || t("loginPage.invalidCredentials"));
      // Clear password field on error
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card
        className="max-w-md w-full space-y-8 p-8 shadow-soft-xl"
        dir={direction}
      >
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary-900">
            {t("loginPage.welcomeBack")}
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            {language === "en" ? "Or " : ""}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {t("loginPage.createAccount")}
            </Link>
            {language === "ar" ? " أو" : ""}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              label={t("loginPage.emailLabel")}
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t("loginPage.emailPlaceholder")}
              className="w-full"
            />
            <Input
              id="password"
              name="password"
              type="password"
              label={t("loginPage.passwordLabel")}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t("loginPage.passwordPlaceholder")}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded transition-colors"
              />
              <label
                htmlFor="remember-me"
                className={`${
                  language === "ar" ? "mr-2" : "ml-2"
                } block text-sm text-secondary-700`}
              >
                {t("loginPage.rememberMe")}
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {t("loginPage.forgotPassword")}
            </Link>
          </div>

          {error && (
            <div
              className={`p-4 rounded-lg text-sm text-center animate-fade-in ${
                error.includes(t("loginPage.accountBlocked"))
                  ? "bg-error-100 border-2 border-error-300 text-error-800"
                  : "bg-error-50 text-error-700"
              }`}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            className="mt-6"
          >
            {isLoading ? t("loginPage.signingIn") : t("loginPage.signIn")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default React.memo(Login);
