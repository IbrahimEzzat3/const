import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../shared/services/auth";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button, Input, Card } from "../ui";
import { API_URL } from "../../config";

const UpdateDetails = () => {
  const navigate = useNavigate();
  const { t, language, direction } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authService.getMe();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar,
        });
      } catch (err) {
        setError(t("updateDetailsPage.loadError"));
        if (err.message === t("updateDetailsPage.unauthorized")) {
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (avatarFile) {
        data.append("avatar", avatarFile, avatarFile.name);
      }

      const response = await authService.updateDetails(data);

      setMessage(response.message || t("updateDetailsPage.updateSuccess"));

      setAvatarPreview(null);
      setAvatarFile(null);

      const fileInput = document.getElementById("avatar");
      if (fileInput) {
        fileInput.value = "";
      }

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || t("updateDetailsPage.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="p-8 shadow-soft-xl" dir={direction}>
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-primary-900">
              {t("updateDetailsPage.title")}
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              {t("updateDetailsPage.subtitle")}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="name"
                name="name"
                type="text"
                label={t("updateDetailsPage.fullNameLabel")}
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t("updateDetailsPage.fullNamePlaceholder")}
                className={`w-full ${direction}`}
              />
              <Input
                id="email"
                name="email"
                type="email"
                label={t("updateDetailsPage.emailLabel")}
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t("updateDetailsPage.emailPlaceholder")}
                className={`w-full ${direction}`}
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                label={t("updateDetailsPage.phoneLabel")}
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("updateDetailsPage.phonePlaceholder")}
                className={`w-full ${direction}`}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary-700">
                  {t("updateDetailsPage.profilePictureLabel")}
                </label>
                <div
                  className={`flex items-center ${
                    language === "ar" ? "space-x-reverse" : "space-x-4"
                  } space-x-4`}
                >
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-secondary-200"
                    src={`https://const-production.up.railway.app/${formData.avatar}`}
                    alt={t("updateDetailsPage.profilePreviewAlt")}
                    loading="lazy"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className={`block w-full text-sm text-secondary-600
                        ${
                          language === "ar" ? "file:ml-4" : "file:mr-4"
                        } file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-50 file:text-primary-700
                        hover:file:bg-primary-100
                        transition-colors`}
                    />
                    {avatarFile && (
                      <p className="mt-1 text-xs text-secondary-500">
                        {t("updateDetailsPage.selectedFile", {
                          fileName: avatarFile.name,
                        })}
                      </p>
                    )}
                    {avatarPreview && (
                      <p className="mt-1 text-xs text-success-600">
                        {t("updateDetailsPage.previewReady")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/profile")}
              >
                {t("updateDetailsPage.cancelButton")}
              </Button>
              <Button type="submit" variant="primary" isLoading={isLoading}>
                {isLoading
                  ? t("updateDetailsPage.updatingButton")
                  : t("updateDetailsPage.updateButton")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateDetails;
