import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../shared/services/auth";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button, Input, Card } from "../ui";

const Register = () => {
  const navigate = useNavigate();
  const { t, language, direction } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError(t("registerPage.passwordLength"));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t("registerPage.passwordsDoNotMatch"));
      return false;
    }
    if (!formData.name.trim()) {
      setError(t("registerPage.nameRequired"));
      return false;
    }
    if (!formData.email.trim()) {
      setError(t("registerPage.emailRequired"));
      return false;
    }
    if (!formData.phone.trim()) {
      setError(t("registerPage.phoneRequired"));
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("registerPage.invalidEmail"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(formData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/";
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || t("registerPage.registrationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card
        className="max-w-md w-full space-y-8 p-8 shadow-soft-xl"
        dir={direction}
      >
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary-900">
            {t("registerPage.createAccount")}
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            {language === "en" ? "Or " : ""}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {t("registerPage.signInToAccount")}
            </Link>
            {language === "ar" ? " أو" : ""}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              label={t("registerPage.fullNameLabel")}
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t("registerPage.fullNamePlaceholder")}
              className="w-full"
            />
            <Input
              id="email"
              name="email"
              type="email"
              label={t("registerPage.emailLabel")}
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t("registerPage.emailPlaceholder")}
              className="w-full"
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              label={t("registerPage.phoneLabel")}
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("registerPage.phonePlaceholder")}
              className={`w-full ${direction}`}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label={t("registerPage.passwordLabel")}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t("registerPage.passwordPlaceholder")}
              className="w-full"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={t("registerPage.confirmPasswordLabel")}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("registerPage.confirmPasswordPlaceholder")}
              className="w-full"
            />
          </div>

          {error && (
            <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="text-sm text-secondary-600">
            {t("registerPage.termsAgreement")}{" "}
            <Link
              to="/terms"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {t("registerPage.termsOfService")}
            </Link>{" "}
            {t("registerPage.and")}{" "}
            <Link
              to="/privacy"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {t("registerPage.privacyPolicy")}
            </Link>
            .
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            {isLoading
              ? t("registerPage.creatingAccount")
              : t("registerPage.createAccountButton")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default React.memo(Register);
