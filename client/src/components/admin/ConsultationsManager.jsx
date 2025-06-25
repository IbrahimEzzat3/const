import React, { useState, useEffect, useCallback } from "react";
import { consultationService } from "../../shared/services/consultationsService";
import debounce from "lodash/debounce";
import CustomAlert from "../../shared/components/CustomAlert";

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

const ConsultationsManager = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, confirmed, completed, cancelled
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusReason, setStatusReason] = useState("");
  const [statusHistory, setStatusHistory] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    showCancelButton: false,
    onConfirm: null,
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term, status, urgency) => {
      try {
        let filtered = consultations;

        // Apply status filter
        if (status !== "all") {
          filtered = filtered.filter(
            (consultation) => consultation.status === status
          );
        }

        // Apply search term filter
        if (term.trim()) {
          filtered = filtered.filter(
            (consultation) =>
              consultation.user?.name
                ?.toLowerCase()
                .includes(term.toLowerCase()) ||
              consultation.description
                ?.toLowerCase()
                .includes(term.toLowerCase()) ||
              consultation.projectType
                ?.toLowerCase()
                .includes(term.toLowerCase()) ||
              consultation.service?.toLowerCase().includes(term.toLowerCase())
          );
        }

        setFilteredConsultations(filtered);
      } catch (err) {
        setError("Failed to search consultations");
      }
    }, 300),
    [consultations]
  );

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Effect to trigger search when filters change
  useEffect(() => {
    if (!searchTerm.trim() && statusFilter === "all") {
      setFilteredConsultations(consultations);
      return;
    }
    debouncedSearch(searchTerm, statusFilter);
    return () => debouncedSearch.cancel();
  }, [searchTerm, statusFilter, consultations, debouncedSearch]);

  const fetchConsultations = async () => {
    try {
      setIsLoading(true);
      // Request all consultations by setting a very high limit
      const data = await consultationService.getAllConsultations({
        limit: 1000, // Set a high limit to get all consultations
      });

      if (data && data.success) {
        const consultationsData = Array.isArray(data.data) ? data.data : [];
        setConsultations(consultationsData);
        setFilteredConsultations(consultationsData);
      } else {
        setConsultations([]);
        setFilteredConsultations([]);
      }
    } catch (err) {
      setError("Failed to load consultations");
      setConsultations([]);
      setFilteredConsultations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = async (id, currentStatus) => {
    setSelectedConsultation(id);
    setNewStatus(currentStatus || "pending");
    setIsStatusModalOpen(true);

    // Fetch status history
    try {
      const response = await consultationService.getStatusHistory(id);

      // Ensure statusHistory is an array
      const historyData = Array.isArray(response?.data) ? response.data : [];
      setStatusHistory(historyData);
    } catch (error) {
      setStatusHistory([]); // Set empty array on error
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusReason.trim()) {
      return;
    }

    try {
      const response = await consultationService.updateConsultationStatus(
        selectedConsultation,
        { status: newStatus, reason: statusReason }
      );

      // Update the consultation in the state
      setConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
          consultation?._id === selectedConsultation
            ? { ...consultation, status: newStatus }
            : consultation
        )
      );

      // Update filtered consultations as well
      setFilteredConsultations((prevFiltered) =>
        prevFiltered.map((consultation) =>
          consultation?._id === selectedConsultation
            ? { ...consultation, status: newStatus }
            : consultation
        )
      );

      // Update status history - ensure we have an array
      if (response?.data?.statusChange) {
        setStatusHistory((prev) => [...prev, response.data.statusChange]);
      }

      setIsStatusModalOpen(false);
      setStatusReason("");
    } catch (error) {
      showAlert({
        type: "error",
        title: "Cannot Change Status!",
        message:
          "Cannot Update consultation status after it has been processed.",
        confirmButtonText: "OK",
      });
    }
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

  const handleDelete = async (id) => {
    showAlert({
      type: "warning",
      title: "Are you sure?",
      message: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          await consultationService.deleteConsultation(id);
          setConsultations((prev) =>
            prev.filter((consultation) => consultation._id !== id)
          );
          showAlert({
            type: "success",
            title: "Deleted!",
            message: "The consultation has been deleted.",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        } catch (err) {
          showAlert({
            type: "error",
            title: "Cannot Deleted!",
            message: "Cannot delete consultation after it has been processed.",
            confirmButtonText: "OK",
          });
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"
          role="status"
          aria-label="Loading consultations"
        >
          <span className="sr-only">Loading consultations...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-center py-12">
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
        <button
          onClick={fetchConsultations}
          className="text-accent-gold hover:text-accent-gold/90"
          aria-label="Retry loading consultations"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="space-y-4 md:space-y-6 px-2 md:px-0">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h1 className="text-xl md:text-2xl font-semibold text-accent-teal">
          Manage Consultations
        </h1>
        <nav aria-label="Consultation filters" className="w-full md:w-auto">
          <form
            className="flex flex-col md:flex-row gap-3 md:gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1 md:flex-none md:w-64">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search consultations..."
                className="w-full px-3 md:px-4 py-2 pl-3 md:pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent text-sm md:text-base"
                aria-label="Search consultations"
              />
              <div className="absolute inset-y-0 right-0 pr-3 md:right-auto md:left-0 md:pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 md:flex gap-3 md:gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 md:px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent text-sm md:text-base"
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </form>
        </nav>
      </header>

      <section aria-label="Consultations list">
        {filteredConsultations.length === 0 ? (
          <article className="text-center py-8">
            <p className="text-gray-500 text-sm md:text-base">
              No consultations found
            </p>
          </article>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <div key={consultation._id} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-accent-teal">
                        {consultation.user?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {consultation.user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-accent-teal">
                        Service: {consultation.service}
                      </p>
                      <p className="text-sm text-accent-teal mt-1">
                        Project: {consultation.projectType}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            consultation._id,
                            consultation.status
                          )
                        }
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          consultation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : consultation.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : consultation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        aria-label={`Change status from ${consultation.status}`}
                      >
                        {consultation.status}
                      </button>
                      {consultation.isUrgent && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(consultation._id)}
                        className="text-accent-gold hover:text-accent-gold/90 text-sm"
                        disabled={isDeleting}
                        aria-label={`Delete consultation for ${consultation.user?.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <table className="hidden md:table min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-accent-teal uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-accent-teal uppercase tracking-wider"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-accent-teal uppercase tracking-wider"
                  >
                    Project Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-accent-teal uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-accent-teal uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => (
                  <tr key={consultation._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-accent-teal">
                        {consultation.user?.name}
                      </div>
                      <div className="text-sm text-accent-teal">
                        {consultation.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-accent-teal">
                        {consultation.service}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-accent-teal">
                        {consultation.projectType.substring(0, 10)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            consultation._id,
                            consultation.status
                          )
                        }
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          consultation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : consultation.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : consultation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        aria-label={`Change status from ${consultation.status}`}
                      >
                        {consultation.status}
                      </button>
                      {consultation.isUrgent && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Urgent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(consultation._id)}
                        className="text-accent-gold hover:text-accent-gold/90"
                        disabled={isDeleting}
                        aria-label={`Delete consultation for ${consultation.user?.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Consultation Status"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStatusUpdate();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
              aria-label="Select new status"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Change
            </label>
            <textarea
              id="reason"
              value={statusReason}
              onChange={(e) => setStatusReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
              rows="3"
              required
              aria-label="Reason for status change"
            />
          </div>
          {statusHistory.length > 0 && (
            <aside className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Status History
              </h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {statusHistory.map((history, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <time dateTime={history.changedAt}>
                      {new Date(history.changedAt).toLocaleString()}
                    </time>
                    <span className="mx-2">-</span>
                    <span>{history.status}</span>
                    {history.reason && (
                      <p className="text-gray-500 mt-1 text-xs">
                        {history.reason}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Status
            </button>
          </div>
        </form>
      </Modal>

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
    </main>
  );
};

export default ConsultationsManager;
