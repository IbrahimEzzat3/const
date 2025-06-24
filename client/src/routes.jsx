import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Public Pages
import HomePage from "./pages/home/HomePage";

// Service Pages
import InteriorDesign from "./pages/services/InteriorDesign";
import ExteriorDesign from "./pages/services/ExteriorDesign";
import GardenDesign from "./pages/services/GardenDesign";
import SmartAutomation from "./pages/services/SmartAutomation";
import CostCalculator from "./pages/services/CostCalculator";
import DecorationDesign from "./pages/services/DecorationDesign";
import CommercialDesign from "./pages/services/CommercialDesign";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProfilePage from "./pages/auth/ProfilePage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";
import UpdateDetailsPage from "./pages/auth/UpdateDetailsPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import CourseManagerPage from "./pages/admin/CourseManagerPage";
import BlogManagerPage from "./pages/admin/BlogManagerPage";
import ConsultationsManagerPage from "./pages/admin/ConsultationsManagerPage";
import TestimonialsManagerPage from "./pages/admin/TestimonialsManagerPage";
import UserManagerPage from "./pages/admin/UserManagerPage";
import CreateCoursePage from "./pages/admin/CreateCoursePage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import CreateBlogPage from "./pages/admin/CreateBlogPage";
import EditBlogPage from "./pages/admin/EditBlogPage";

// User Pages
import ConsultationsListPage from "./pages/consultations/ConsultationsListPage";
import ConsultationDetailPage from "./pages/consultations/ConsultationDetailPage";
import ConsultationFormPage from "./pages/consultations/ConsultationFormPage";

import CoursesPage from "./pages/courses/CoursesPage";
import CourseDetailPage from "./pages/courses/CourseDetailPage";

import BlogsListPage from "./pages/blogs/BlogsListPage";
import BlogDetailPage from "./pages/blogs/BlogDetailPage";

import TestimonialDetailPage from "./pages/testimonials/TestimonialDetailPage";
import TestimonialFormPage from "./pages/testimonials/TestimonialFormPage";
import TestimonialsListPage from "./pages/testimonials/TestimonialsListPage";

// Project Pages
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";

// Legal Pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Error Pages
import NotFoundPage from "./pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
   

      {/* Service Routes */}
      <Route path="/services/interior-design" element={<InteriorDesign />} />
      <Route path="/services/exterior-design" element={<ExteriorDesign />} />
      <Route path="/services/garden-design" element={<GardenDesign />} />
      <Route path="/services/smart-automation" element={<SmartAutomation />} />
      <Route
        path="/services/decoration-design"
        element={<DecorationDesign />}
      />
      <Route
        path="/services/commercial-design"
        element={<CommercialDesign />}
      />
      <Route path="/services/cost-calculator" element={<CostCalculator />} />

      {/* Project Routes */}
      <Route path="/projects/:projectSlug" element={<ProjectDetailPage />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-password"
        element={
          <ProtectedRoute>
            <UpdatePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-details"
        element={
          <ProtectedRoute>
            <UpdateDetailsPage />
          </ProtectedRoute>
        }
      />

      {/* Protected User Routes */}
      <Route path="/testimonials" element={<TestimonialsListPage />} />
      <Route
        path="/testimonials/:testimonialId"
        element={<TestimonialDetailPage />}
      />
      <Route
        path="/testimonials/new"
        element={
          <ProtectedRoute>
            <TestimonialFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/testimonials/:testimonialId/edit"
        element={
          <ProtectedRoute>
            <TestimonialFormPage isEdit={true} />
          </ProtectedRoute>
        }
      />

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />

      <Route path="/blogs/" element={<BlogsListPage />} />
      <Route path="/blogs/:blogId" element={<BlogDetailPage />} />

      <Route
        path="/consultations"
        element={
          <ProtectedRoute>
            <ConsultationsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultations/:consultationId"
        element={
          <ProtectedRoute>
            <ConsultationDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultations/new"
        element={
          <ProtectedRoute>
            <ConsultationFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultations/:consultationId/edit"
        element={
          <ProtectedRoute>
            <ConsultationFormPage isEdit={true} />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManagerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <AdminRoute>
            <CourseManagerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/courses/new"
        element={
          <AdminRoute>
            <CreateCoursePage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/courses/:courseId/edit"
        element={
          <AdminRoute>
            <EditCoursePage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <AdminRoute>
            <BlogManagerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/blogs/new"
        element={
          <AdminRoute>
            <CreateBlogPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/blogs/:blogId/edit"
        element={
          <AdminRoute>
            <EditBlogPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/consultations"
        element={
          <AdminRoute>
            <ConsultationsManagerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <AdminRoute>
            <TestimonialsManagerPage />
          </AdminRoute>
        }
      />

      {/* Legal Routes */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Catch all route - 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
