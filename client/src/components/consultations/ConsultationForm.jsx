import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { consultationService } from "../../shared/services/consultationsService";
import CustomAlert from "../../shared/components/CustomAlert";

// WhatsApp configuration
const WHATSAPP_NUMBER = "966558813386"; // Egypt country code (20) + number

const ConsultationForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { consultationId } = useParams();
  const [formData, setFormData] = useState({
    service: "",
    projectType: "",
    description: "",
    location: "",
    preferredDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  const serviceCategories = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "renovation", label: "Renovation" },
    { value: "interior-design", label: "Interior Design" },
    { value: "project-management", label: "Project Management" },
    { value: "sustainability", label: "Sustainability" },
  ];

  useEffect(() => {
    if (isEdit && consultationId) {
      const fetchConsultation = async () => {
        try {
          const data = await consultationService.getConsultation(
            consultationId
          );
          const consultation = data.data;

          // Format the date to YYYY-MM-DD for the input field
          const preferredDate = consultation.preferredDate
            ? new Date(consultation.preferredDate).toISOString().split("T")[0]
            : "";

          setFormData({
            service: consultation.service || "",
            projectType: consultation.projectType || "",
            description: consultation.description || "",
            location: consultation.location || "",
            preferredDate: preferredDate,
          });
        } catch (err) {
          setError("Failed to load consultation");
        }
      };
      fetchConsultation();
    }
  }, [isEdit, consultationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendWhatsAppMessage = (consultationData) => {
    const message = `New Consultation Request:\n\nService: ${consultationData.service}\nProject Type: ${consultationData.projectType}\nLocation: ${consultationData.location}\nPreferred Date: ${consultationData.preferredDate}\n\nDescription:\n${consultationData.description}`;

    // Format phone number - remove leading zeros and any special characters
    const formattedNumber = WHATSAPP_NUMBER.replace(/^0+/, "").replace(
      /[^0-9]/g,
      ""
    );

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL with formatted number (now includes country code)
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${formattedNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      ...config,
    });
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEdit) {
        try {
          await consultationService.updateConsultation(
            consultationId,
            formData
          );
          showAlert({
            type: "success",
            title: "Success!",
            message: "Consultation updated successfully.",
            showCancelButton: false,
            confirmButtonText: "OK",
            onConfirm: () => navigate("/consultations"),
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: "Cannot Update Confirmed Consultation!",
            message: "Cannot Update Confirmed Consultation.",
            showCancelButton: false,
            confirmButtonText: "OK",
            onConfirm: () => navigate("/consultations"),
          });
        }
      } else {
        await consultationService.createConsultation(formData);
        // Send WhatsApp message only for new consultations
        sendWhatsAppMessage(formData);
        showAlert({
          type: "success",
          title: "Success!",
          message:
            "Consultation submitted successfully. We'll contact you soon!",
          showCancelButton: false,
          confirmButtonText: "OK",
          onConfirm: () => navigate("/consultations"),
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to save consultation";
      setError(errorMessage);
      showAlert({
        type: "error",
        title: "Error",
        message: errorMessage,
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      )}

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Service Type
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select a service type</option>
          {serviceCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Type
        </label>
        <input
          type="text"
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          minLength="50"
          maxLength="1000"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/1000 characters (minimum 50)
        </p>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="preferredDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Preferred Date
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/consultations")}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Saving..."
            : isEdit
            ? "Update Consultation"
            : "Submit Consultation"}
        </button>
      </div>

      <CustomAlert
        isOpen={alertConfig.isOpen}
        onClose={handleCloseAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        showCancelButton={alertConfig.showCancelButton}
        confirmButtonText={alertConfig.confirmButtonText}
        cancelButtonText={alertConfig.cancelButtonText}
        onConfirm={alertConfig.onConfirm}
      />
    </form>
  );
};

export default ConsultationForm;
