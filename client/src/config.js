// API Configuration
export const API_URL =
  import.meta.env.VITE_API_URL || "https://const-production.up.railway.app/api";

// Auth Configuration
export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

// File Upload Configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Pagination Configuration
export const ITEMS_PER_PAGE = 10;

// Routes Configuration
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  UPDATE_DETAILS: "/update-details",
  UPDATE_PASSWORD: "/update-password",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Service Routes
  SERVICES: {
    INTERIOR_DESIGN: "/services/interior-design",
    EXTERIOR_DESIGN: "/services/exterior-design",
    GARDEN_DESIGN: "/services/garden-design",
    SMART_AUTOMATION: "/services/smart-automation",
    TRAINING_COURSES: "/courses",
    COST_CALCULATOR: "/services/cost-calculator",
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Please login to continue.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_EXISTS: "Email already exists.",
  INVALID_TOKEN: "Invalid or expired token.",
  FILE_TOO_LARGE: `File size must be less than ${
    MAX_FILE_SIZE / (1024 * 1024)
  }MB.`,
  INVALID_FILE_TYPE: "Only JPEG, PNG and GIF files are allowed.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful!",
  REGISTER: "Registration successful!",
  LOGOUT: "Logged out successfully.",
  UPDATE_PROFILE: "Profile updated successfully.",
  UPDATE_PASSWORD: "Password updated successfully.",
  RESET_PASSWORD: "Password reset successful.",
  FORGOT_PASSWORD: "Password reset instructions sent to your email.",
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_PATTERN: /^[0-9+\-\s()]*$/,
  EMAIL_PATTERN: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
};

// Theme Configuration
export const THEME = {
  COLORS: {
    PRIMARY: "#4F46E5", // Indigo-600
    SECONDARY: "#6B7280", // Gray-500
    SUCCESS: "#10B981", // Emerald-500
    DANGER: "#EF4444", // Red-500
    WARNING: "#F59E0B", // Amber-500
    INFO: "#3B82F6", // Blue-500
    LIGHT: "#F3F4F6", // Gray-100
    DARK: "#1F2937", // Gray-800
  },
  FONT_SIZES: {
    XS: "0.75rem",
    SM: "0.875rem",
    BASE: "1rem",
    LG: "1.125rem",
    XL: "1.25rem",
    "2XL": "1.5rem",
    "3XL": "1.875rem",
    "4XL": "2.25rem",
  },
  SPACING: {
    XS: "0.25rem",
    SM: "0.5rem",
    MD: "1rem",
    LG: "1.5rem",
    XL: "2rem",
    "2XL": "3rem",
    "3XL": "4rem",
  },
};

// Export all configurations
export default {
  API_URL,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  ITEMS_PER_PAGE,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
  THEME,
};
