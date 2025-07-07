import React, { useEffect, useState } from "react";
import { courseService } from "../../shared/services/courseService";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
const EnrollmentsManagerPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await courseService.getAllEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError("Failed to fetch enrollments");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enrollments</h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" variant="primary" />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : enrollments.length === 0 ? (
        <div>No enrollments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td className="px-4 py-2 border">
                    {enroll.fullNameEn || enroll.fullNameAr || "-"}
                  </td>
                  <td className="px-4 py-2 border">{enroll.email}</td>
                  <td className="px-4 py-2 border">
                    {enroll.course?.title || enroll.course || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {enroll.createdAt
                      ? new Date(enroll.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/admin/enrollments/${enroll._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrollmentsManagerPage;
