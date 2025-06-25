import React from "react";
import { Link } from "react-router-dom";

const Consultation = ({ consultation }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {consultation.projectType}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                Created: {new Date(consultation.createdAt).toLocaleDateString()}
              </span>
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
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {consultation.description.length > 150
            ? `${consultation.description.substring(0, 150)}...`
            : consultation.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {consultation.service && (
              <span className="text-accent-gold">
                Service: {consultation.service}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/consultations/${consultation._id}`}
            className="text-accent-gold hover:text-accent-gold/90 font-medium text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
