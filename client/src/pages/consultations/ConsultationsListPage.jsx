import React from "react";
import { Link } from "react-router-dom";
import ConsultationsList from "../../components/consultations/ConsultationsList";
import usePageTitle from "../../shared/hooks/usePageTitle";
const ConsultationsListPage = () => {
  usePageTitle("Consultations");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">Consultations</h1>
        <Link
          to="/consultations/new"
          className="px-4 py-2 bg-accent-gold text-accent-teal rounded-md hover:bg-accent-gold/90 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
        >
          New Consultation
        </Link>
      </div>
      <ConsultationsList />
    </div>
  );
};

export default ConsultationsListPage;
