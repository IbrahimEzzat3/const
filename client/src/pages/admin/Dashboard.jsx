import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../../shared/services/blogService";
import { courseService } from "../../shared/services/courseService";
import { consultationService } from "../../shared/services/consultationsService";
import { testimonialService } from "../../shared/services/testimonialService";
import usePageTitle from "../../shared/hooks/usePageTitle";

// Custom SVG Icons
const BlogIcon = ({ className = "w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" />
    <path d="M8 7H16" />
    <path d="M8 12H16" />
    <path d="M8 17H12" />
  </svg>
);

const GraduationCapIcon = ({ className = "w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 10V6L12 2L2 6L12 10L22 6" />
    <path d="M6 12V17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V12" />
    <path d="M12 22V12" />
  </svg>
);

const CommentsIcon = ({ className = "w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V15Z" />
  </svg>
);

const StarIcon = ({ className = "w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const PlusIcon = ({ className = "w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5V19" />
    <path d="M5 12H19" />
  </svg>
);

const EditIcon = ({ className = "w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" />
    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" />
  </svg>
);

const EyeIcon = ({ className = "w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" />
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
  </svg>
);

const UsersIcon = ({ className = "w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
  </svg>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: { total: 0, published: 0 },
    courses: { total: 0, active: 0 },
    consultations: { total: 0, pending: 0 },
    testimonials: { total: 0, averageRating: 0 },
  });
  const [recentItems, setRecentItems] = useState({
    blogs: [],
    courses: [],
    consultations: [],
    testimonials: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  usePageTitle("dashboard");
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Option 1: Use high limit to fetch all data (your current backend supports this)
      const [blogsData, coursesData, consultationsData, testimonialsData] =
        await Promise.all([
          blogService.getAllBlogs({ page: 1, limit: 1000 }),
          courseService.getAllCourses({ page: 1, limit: 1000 }),
          consultationService.getAllConsultations(),
          testimonialService.getAllTestimonials(),
        ]);

      // Now we have all the data, so we can filter accurately
      const blogs = blogsData.data;
      const publishedBlogs = blogs.filter((b) => b.isPublished);

      const courses = coursesData.data;
      const activeCourses = courses.filter((c) => c.isActive);

      const consultations = consultationsData.data;
      const pendingConsultations = consultations.filter(
        (c) => c.status === "pending"
      );

      const testimonials = testimonialsData.data;
      const averageRating =
        testimonials.length > 0
          ? (
              testimonials.reduce((acc, t) => acc + t.rating, 0) /
              testimonials.length
            ).toFixed(1)
          : 0;

      // Update stats with actual counts
      setStats({
        blogs: {
          total: blogs.length,
          published: publishedBlogs.length,
        },
        courses: {
          total: courses.length,
          active: activeCourses.length,
        },
        consultations: {
          total: consultationsData.total, // Use total from API
          pending: pendingConsultations.length, // Use filtered count
        },
        testimonials: {
          total: testimonials.length,
          averageRating: averageRating,
        },
      });

      // Set recent items (first 3 since they're sorted by createdAt desc)
      setRecentItems({
        blogs: blogs.slice(0, 3),
        courses: courses.slice(0, 3),
        consultations: consultations.slice(0, 3),
        testimonials: testimonials.slice(0, 3),
      });
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard data error:", err);
    } finally {
      setIsLoading(false);
    }
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
          onClick={fetchDashboardData}
          className="text-accent-gold hover:text-accent-gold/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  const StatCard = ({ title, icon: Icon, stats, link }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-accent-teal">{title}</h3>
        {Icon && <Icon className="h-6 w-6 text-accent-gold" />}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-2xl font-bold text-accent-teal">{value}</p>
            <p className="text-sm text-accent-teal capitalize">{key}</p>
          </div>
        ))}
      </div>
      <Link
        to={link}
        className="block text-center text-accent-gold hover:text-accent-gold/90 text-sm font-medium"
      >
        View All
      </Link>
    </div>
  );

  const RecentItemsCard = ({ title, items, type, link }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Link
          to={link}
          className="text-accent-gold hover:text-accent-gold/90 text-sm font-medium"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-accent-teal truncate">
                {item.title ||
                  item.projectType ||
                  `${item.content.substring(0, 10)}...`}
              </p>
              <p className="text-xs text-accent-teal">
                {type === "blogs" && item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString()
                  : new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <Link
                to={`/admin/${type}/${item._id}/edit`}
                className="text-accent-gold hover:text-accent-gold/90"
                title="Edit"
              >
                <EditIcon className="h-4 w-4" />
              </Link>
              <Link
                to={`/${type}/${item._id}`}
                className="text-accent-teal hover:text-accent-teal/90"
                title="View"
                // target="_blank"
              >
                <EyeIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-accent-teal text-center py-2">
            No {type} found
          </p>
        )}
      </div>
    </div>
  );

  const QuickActionButton = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center justify-center space-x-2 px-4 py-2 bg-accent-gold text-accent-teal rounded-md hover:bg-accent-gold/90 transition-colors"
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-accent-teal">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <QuickActionButton
            to="/admin/blogs/new"
            icon={PlusIcon}
            label="New Blog"
          />
          <QuickActionButton
            to="/admin/courses/new"
            icon={PlusIcon}
            label="New Course"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Blogs"
          icon={BlogIcon}
          stats={stats.blogs}
          link="/admin/blogs"
        />
        <StatCard
          title="Courses"
          icon={GraduationCapIcon}
          stats={stats.courses}
          link="/admin/courses"
        />
        <StatCard
          title="Consultations"
          icon={CommentsIcon}
          stats={stats.consultations}
          link="/admin/consultations"
        />
        <StatCard
          title="Testimonials"
          icon={StarIcon}
          stats={stats.testimonials}
          link="/admin/testimonials"
        />
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-accent-gold mb-4">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/users"
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <UsersIcon className="h-5 w-5 text-accent-gold" />
            <span className="text-sm font-medium text-accent-teal">
              Manage Users
            </span>
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <BlogIcon className="h-5 w-5 text-accent-gold" />
            <span className="text-sm font-medium text-accent-teal">
              Manage Blogs
            </span>
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <GraduationCapIcon className="h-5 w-5 text-accent-gold" />
            <span className="text-sm font-medium text-accent-teal">
              Manage Courses
            </span>
          </Link>
          <Link
            to="/admin/consultations"
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <CommentsIcon className="h-5 w-5 text-accent-gold" />
            <span className="text-sm font-medium text-accent-teal">
              Manage Consultations
            </span>
          </Link>
          <Link
            to="/admin/testimonials"
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
              <StarIcon className="h-5 w-5 text-accent-gold" />
            <span className="text-sm font-medium text-accent-teal">
              Manage Testimonials
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentItemsCard
          title="Recent Blogs"
          items={recentItems.blogs}
          type="blogs"
          link="/admin/blogs"
        />
        <RecentItemsCard
          title="Recent Courses"
          items={recentItems.courses}
          type="courses"
          link="/admin/courses"
        />
        <RecentItemsCard
          title="Recent Consultations"
          items={recentItems.consultations}
          type="consultations"
          link="/admin/consultations"
        />
        <RecentItemsCard
          title="Recent Testimonials"
          items={recentItems.testimonials}
          type="testimonials"
          link="/admin/testimonials"
        />
      </div>
    </div>
  );
};

export default Dashboard;
