import React, { useState, useEffect } from "react";
import { consultationService } from "../../shared/services/consultationsService";
import Consultation from "./Consultation";

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [allConsultations, setAllConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");

  const serviceCategories = [
    { value: "all", label: "All Services" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "renovation", label: "Renovation" },
    { value: "interior-design", label: "Interior Design" },
    { value: "project-management", label: "Project Management" },
    { value: "sustainability", label: "Sustainability" },
  ];

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const data = await consultationService.getMyConsultations();
        setAllConsultations(data.data);
        setConsultations(data.data);
      } catch (err) {
        setError("Failed to load consultations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // Update consultations when category changes
  useEffect(() => {
    if (category === "all") {
      setConsultations(allConsultations);
    } else {
      const filtered = allConsultations.filter(
        (consultation) => consultation.service === category
      );
      setConsultations(filtered);
    }
  }, [category, allConsultations]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-accent-gold hover:text-accent-gold/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border ltr border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
          >
            {serviceCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* All Consultations */}
      <div>
        {consultations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {consultations.map((consultation) => (
              <Consultation
                key={consultation._id}
                consultation={consultation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No consultations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationsList;
