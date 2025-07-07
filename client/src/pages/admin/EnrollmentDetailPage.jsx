import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseService } from "../../shared/services/courseService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const EnrollmentDetailPage = () => {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await courseService.getEnrollmentById(id);
        setEnrollment(data);
      } catch (err) {
        setError("Failed to load enrollment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!enrollment) return <div className="p-4">No data found.</div>;

  return (
    <div className="max-w-4xl ltr  mt-20 mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Enrollment Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name (EN)" value={enrollment.fullNameEn} />
        <Field label="Full Name (AR)" value={enrollment.fullNameAr} />
        <Field label="Email" value={enrollment.email} />
        <Field label="Phone" value={enrollment.phone} />
        <Field label="Birth Date" value={formatDate(enrollment.birthDate)} />
        <Field label="Nationality" value={enrollment.nationality} />
        <Field label="City" value={enrollment.city} />
        <Field label="Degree" value={enrollment.degree} />
        <Field label="Major" value={enrollment.major} />
        <Field label="University" value={enrollment.university} />
        <Field label="Current Job" value={enrollment.currentJob || "-"} />
        <Field label="Company" value={enrollment.company || "-"} />
        <Field
          label="Years of Experience"
          value={enrollment.yearsExperience || "-"}
        />
        <Field label="Course Title" value={enrollment.course?.title || "-"} />
        <Field label="Course Language" value={enrollment.courseLanguage} />
        <Field label="Start Date" value={enrollment.startDate} />
        <Field label="Package" value={enrollment.package} />
        <Field label="Wants Scholarship" value={enrollment.wantScholarship} />
        <Field
          label="Scholarship Reason"
          value={enrollment.scholarshipReason || "-"}
        />
        <Field label="Payment Method" value={enrollment.paymentMethod} />
        <Field
          label="Agreed to Terms"
          value={enrollment.agree ? "Yes" : "No"}
        />
        <Field
          label="Created At"
          value={formatDateTime(enrollment.createdAt)}
        />
      </div>
    </div>
  );
};

// Reusable Field Component
const Field = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-700">{label}:</p>
    <p className="text-gray-900">{value || "-"}</p>
  </div>
);

// Utility functions
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "-";
};

const formatDateTime = (dateTime) => {
  return dateTime ? new Date(dateTime).toLocaleString() : "-";
};

export default EnrollmentDetailPage;
