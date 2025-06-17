import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { consultationService } from "../../shared/services/consultationsService";
import CustomAlert from "../../shared/components/CustomAlert";

const ConsultationDetail = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const data = await consultationService.getConsultation(consultationId);
        setConsultation(data.data);
      } catch (err) {
        setError("Failed to load consultation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultation();
  }, [consultationId]);

  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      ...config,
    });
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = async () => {
    showAlert({
      type: "warning",
      title: "Are you sure?",
      message:
        "You won't be able to revert this! All consultation data will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          await consultationService.deleteConsultation(consultationId);
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "The consultation has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
            onConfirm: () => navigate("/consultations"),
          });
        } catch (err) {

          showAlert({
            type: "error",
            title: "Cannot Deleted!",
            message: "Cannot delete consultation after it has been processed.",
            showCancelButton: false,
            confirmButtonText: "OK",
            onConfirm: () => navigate("/consultations"),
          });
          setIsDeleting(false);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !consultation) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || "Consultation not found"}</p>
        <button
          onClick={() => navigate("/consultations")}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Back to Consultations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {consultation.projectType}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  Created:{" "}
                  {new Date(consultation.createdAt).toLocaleDateString()}
                </span>
                {consultation.service && (
                  <>
                    <span>•</span>
                    <span>{consultation.service}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  consultation.status
                )}`}
              >
                {consultation.status.replace("_", " ").toUpperCase()}
              </span>
              {consultation.isUrgent && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  URGENT
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-6">{consultation.description}</p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => navigate(`/consultations/${consultationId}/edit`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.6 448.2c-1.6 1.6-3.6 2.6-5.7 3.1L153.1 474.7c-10.1 2.5-20.7-2.3-23.2-12.4l-20.5-82.1c-.5-2.1-.5-4.1-.5-6.2L304.3 83.2c3.8-3.8 10-3.8 13.8 0zm-12.7 31.7L129.8 411.3l-45.9 11.5c-2.1 .5-4.1-.5-5.7-2.1L82.1 405.3c-1.6-1.6-2.6-3.6-3.1-5.7L67.7 289.8l11.5-45.9c.5-2.1-.5-4.1-2.1-5.7L289.8 67.7c3.8-3.8 10-3.8 13.8 0l90.2 90.2c3.8 3.8 3.8 10 0 13.8zM566.1 94.6l-89-89c-24-24-62.2-24-86.2 0L193.3 277.9c-2.8 2.8-4.3 6.6-4.3 10.4V368c0 5.3 2.1 10.4 5.9 14.1l48 48c3.8 3.8 8.9 5.9 14.1 5.9H315.6c3.8 0 7.6-1.5 10.4-4.3L566.1 180.8c24-24 24-62.2 0-86.2z" />
          </svg>
          Edit Consultation
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isDeleting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
              Delete Consultation
            </>
          )}
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
    </div>
  );
};

export default ConsultationDetail;
