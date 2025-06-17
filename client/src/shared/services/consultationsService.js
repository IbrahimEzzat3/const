import api from "./api";

export const consultationService = {
  // User routes
  getMyConsultations: async () => {
    const response = await api.get("/consultations/my-consultations");
    return response.data;
  },

  createConsultation: async (consultationData) => {
    const response = await api.post("/consultations", consultationData);
    return response.data;
  },

  // Admin routes
  getAllConsultations: async () => {
    const response = await api.get("/consultations");
    return response.data;
  },

  getPendingConsultations: async () => {
    const response = await api.get("/consultations/pending");
    return response.data;
  },

  getUrgentConsultations: async () => {
    const response = await api.get("/consultations/urgent");
    return response.data;
  },

  updateConsultationStatus: async (id, statusData) => {
    const response = await api.patch(`/consultations/${id}/status`, statusData);
    return response.data;
  },

  getStatusHistory: async (id) => {
    const response = await api.get(`/consultations/${id}/status-history`);
    return response.data;
  },

  assignConsultation: async (id, assignData) => {
    const response = await api.patch(`/consultations/${id}/assign`, assignData);
    return response.data;
  },

  addConsultationNote: async (id, noteData) => {
    const response = await api.post(`/consultations/${id}/notes`, noteData);
    return response.data;
  },

  scheduleMeeting: async (id, meetingData) => {
    const response = await api.post(
      `/consultations/${id}/meeting`,
      meetingData
    );
    return response.data;
  },

  updateMeetingDetails: async (id, meetingData) => {
    const response = await api.put(`/consultations/${id}/meeting`, meetingData);
    return response.data;
  },

  cancelMeeting: async (id) => {
    const response = await api.delete(`/consultations/${id}/meeting`);
    return response.data;
  },

  markAsUrgent: async (id) => {
    const response = await api.patch(`/consultations/${id}/urgent`);
    return response.data;
  },

  markAsResolved: async (id) => {
    const response = await api.patch(`/consultations/${id}/resolve`);
    return response.data;
  },

  // Shared routes (accessible to both users and admins)
  getConsultation: async (id) => {
    const response = await api.get(`/consultations/${id}`);
    return response.data;
  },

  updateConsultation: async (id, consultationData) => {
    const response = await api.put(`/consultations/${id}`, consultationData);
    return response.data;
  },

  deleteConsultation: async (id) => {
    const response = await api.delete(`/consultations/${id}`);
    return response.data;
  },
};
