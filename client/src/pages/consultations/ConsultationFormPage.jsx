import React from "react";
import { useParams } from "react-router-dom";
import ConsultationForm from "../../components/consultations/ConsultationForm";

const ConsultationFormPage = () => {
  const { consultationId } = useParams();
  const isEdit = Boolean(consultationId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">
          {isEdit ? "Edit Consultation" : "New Consultation"}
        </h1>
      </div>
      <ConsultationForm isEdit={isEdit} />
    </div>
  );
};

export default ConsultationFormPage;
