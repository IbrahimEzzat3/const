import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import { useAuth } from "../../shared/context/AuthContext";
import { Button } from "../ui";

const translations = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    blogs: "المدونة",
    courses: "دورات تدريبية",
    testimonials: "آراء العملاء",
    featuredWork: "أعمال مختارة",
    contact: "تواصل معنا",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    companyName: "اسم الشركة",
    interiorDesign: "التصميم الداخلي",
    exteriorDesign: "التصميم الخارجي",
    gardenDesign: "تصميم الحدائق",
    smartAutomation: "الأتمتة الذكية",
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    freeConsultation: "طلب استشارة مجانية",
    costCalculator: "حاسبة تكلفة البناء",
    whatsappContact: "تواصل عبر واتساب",
    decorationDesign: "تصميم الديكورات",
    commercialDesign: "تصميم المساحات التجارية",
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    blogs: "Blogs",
    courses: "Training Courses",
    testimonials: "Testimonials",
    featuredWork: "Featured Work",
    contact: "Contact Us",
    login: "Login",
    register: "Sign Up",
    logout: "Logout",
    companyName: "Company Name",
    interiorDesign: "Interior Design",
    exteriorDesign: "Exterior Design",
    gardenDesign: "Garden Design",
    smartAutomation: "Smart Automation",
    dashboard: "Dashboard",
    profile: "Profile",
    freeConsultation: "Free Consultation",
    costCalculator: "Cost Calculator",
    whatsappContact: "Contact via WhatsApp",
    decorationDesign: "Decoration Design",
    commercialDesign: "Commercial Design",
  },
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, direction } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("cta"), 100);
    } else {
      scrollToSection("cta");
    }
  };

  const menuItems = [
    { label: t.home, path: "/" },
    {
      label: t.about,
      onClick: () => {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => scrollToSection("about"), 100);
        } else {
          scrollToSection("about");
        }
      },
      isScrollLink: true,
    },
    {
      label: t.services,
      path: "/#",
      submenu: [
        { label: t.interiorDesign, path: "/services/interior-design" },
        { label: t.exteriorDesign, path: "/services/exterior-design" },
        { label: t.gardenDesign, path: "/services/garden-design" },
        { label: t.smartAutomation, path: "/services/smart-automation" },
        {
          label: t.decorationDesign,
          path: "/services/decoration-design",
        },
        {
          label: t.commercialDesign,
          path: "/services/commercial-design",
        },
      ],
    },
    { label: t.blogs, path: "/blogs" },
    { label: t.courses, path: "/courses" },
    { label: t.testimonials, path: "/testimonials" },
    {
      label: t.featuredWork,
      onClick: () => {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => scrollToSection("featured-work"), 100);
        } else {
          scrollToSection("featured-work");
        }
      },
      isScrollLink: true,
    },
    {
      label: t.contact,
      onClick: () => {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => scrollToSection("contact"), 100);
        } else {
          scrollToSection("contact");
        }
      },
      isScrollLink: true,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileMenuOpen(false);
  };

  const renderMenuItem = (item) => {
    if (item.isScrollLink) {
      return (
        <Link
          key={item.label}
          to="/"
          onClick={(e) => {
            e.preventDefault();
            item.onClick();
          }}
          className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-secondary-600 hover:text-primary-600"
        >
          {item.label}
        </Link>
      );
    }

    if (item.submenu) {
      return (
        <div key={item.path} className="relative group">
          <Link
            to={item.path}
            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname.startsWith(item.path)
                ? "text-primary-600"
                : "text-secondary-600 hover:text-primary-600"
            }`}
          >
            {item.label}
            {location.pathname.startsWith(item.path) && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
            )}
          </Link>
          <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-soft-2xl ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`block px-4 py-2 text-sm ${
                  location.pathname === subItem.path
                    ? "text-primary-600 bg-primary-50"
                    : "text-secondary-700 hover:bg-secondary-50 hover:text-primary-600"
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-primary-600"
            : "text-secondary-600 hover:text-primary-600"
        }`}
      >
        {item.label}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
        )}
      </Link>
    );
  };

  const renderMobileMenuItem = (item) => (
    <div key={item.label} className="space-y-1">
      {item.isScrollLink ? (
        <button
          onClick={item.onClick}
          className="block w-full px-3 py-2 text-base font-medium rounded-lg text-secondary-600 hover:bg-secondary-50 hover:text-primary-600 text-left"
        >
          {item.label}
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className={`block px-3 py-2 text-base font-medium rounded-lg ${
            location.pathname === item.path
              ? "bg-primary-50 text-primary-600"
              : "text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
          }`}
        >
          {item.label}
        </Link>
      )}
      {item.submenu && (
        <div className="pl-4 space-y-1">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                location.pathname === subItem.path
                  ? "bg-primary-50 text-primary-600"
                  : "text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top Bar */}
      <div
        className={`bg-gray-100 py-2 px-4 ${
          direction === "rtl" ? "rtl" : "ltr"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button
              variant="ghost"
              onClick={handleConsultationClick}
              className="text-center text-blue-900 bg-transparent hover:bg-blue-100 whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12h.025m3.175 0h.025m3.175 0h.025M12 21.75c-6.219 0-11.25-4.717-11.25-10.5S5.781 0.75 12 0.75s11.25 4.717 11.25 10.5S18.219 21.75 12 21.75zM12 18a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
              {t.freeConsultation}
            </Button>
            <Link
              to="/services/cost-calculator"
              className="text-center bg-transparent hover:bg-blue-100 text-blue-900 px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-full flex items-center justify-center whitespace-nowrap transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 16.5V2.25m8.49 10.5L12 14.25m8.25-4.5h-16.5m16.5 0h-16.5M12 21.75c-3.79 0-6.9-2.584-7.854-6.075C3.39 12.333 4.8 9.75 6.75 8.25M12 21.75c3.79 0 6.9-2.584 7.854-6.075C20.61 12.333 19.2 9.75 17.25 8.25m-1.5 6.75L12 14.25m-1.5 6.75L12 14.25"
                />
              </svg>
              {t.costCalculator}
            </Link>
            <a
              href="https://wa.me/966558813386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-transparent hover:bg-blue-100  text-blue-600 px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-full flex items-center justify-center whitespace-nowrap transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.whatsappContact}
            </a>
          </div>
        </div>
      </div>

      {/* Existing Header */}
      <header
        className={`bg-white rounded-b-full shadow-sm ${
          direction === "rtl" ? "rtl" : "ltr"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-secondary-900 hover:text-primary-600 transition-colors duration-200"
            >
              <img
                src="http://localhost:3000/images/logos/logo-shad.png"
                alt="Company Logo"
                className="h-16 w-auto object-cover aspect-auto "
                fetchpriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {menuItems.map((item) => renderMenuItem(item))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="text-secondary-600 bg-transparent hover:text-blue-600"
                >
                  {language === "ar" ? "العربية" : "English"}
                </Button>
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-soft-2xl ring-1 ring-black ring-opacity-5">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleLanguage("ar");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full justify-start bg-transparent text-secondary-600 hover:text-primary-600"
                    >
                      العربية
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleLanguage("en");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full justify-start bg-transparent text-secondary-600 hover:text-primary-600"
                    >
                      English
                    </Button>
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="relative px-2 ml-2 py-2 text-sm font-medium transition-colors duration-200 text-secondary-600 hover:text-primary-600 flex items-center ltr bg-transparent hover:bg-blue-100"
                  >
                    {user?.avatar ? (
                      <img
                        className="h-6 w-6 rounded-full mr-2"
                        src={
                          user?.avatar &&
                          user.avatar !== "public/images/default.png"
                            ? `http://localhost:5000/${user.avatar}`
                            : `http://localhost:5000/public/images/default.png`
                        }
                        alt=""
                        loading="lazy"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )}
                    {user?.name || t.profile}
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-soft-2xl ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-secondary-600 hover:text-primary-600"
                      >
                        {t.profile}
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-secondary-600 hover:text-primary-600"
                        >
                          {t.dashboard}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 bg-transparent py-2  text-sm font-medium text-error-600 hover:bg-error-50"
                      >
                        {t.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-secondary-600 hover:text-primary-600"
                  >
                    {t.login}
                  </Link>
                  <Link
                    to="/register"
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-secondary-600 hover:text-primary-600"
                  >
                    {t.register}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-secondary-100">
              {menuItems.map((item) => renderMobileMenuItem(item))}
              <div className="pt-4 pb-3 border-t border-secondary-100">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        {user?.avatar ? (
                          <img
                            className="h-6 w-6 rounded-full mr-2"
                            src={
                              user?.avatar &&
                              user.avatar !== "public/images/default.png"
                                ? `http://localhost:5000/${user.avatar}`
                                : `http://localhost:5000/public/images/default.png`
                            }
                            alt=""
                            loading="lazy"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6 text-primary-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-secondary-900">
                          {user?.name || t.profile}
                        </div>
                        <div className="text-sm font-medium text-secondary-500">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
                      >
                        {t.profile}
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
                        >
                          {t.dashboard}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full px-4 bg-transparent py-2 text-left text-base font-medium text-error-600 hover:bg-error-50"
                      >
                        {t.logout}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 px-4">
                    <Button
                      variant="primary"
                      fullWidth
                      component={Link}
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.login}
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      component={Link}
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.register}
                    </Button>
                  </div>
                )}
                <div className="mt-4 px-4">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      toggleLanguage(language === "ar" ? "en" : "ar");
                      setMobileMenuOpen(false);
                    }}
                    leftIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 21l-7.5-7.5m10.5-1.5L21 6m-17.25 1.5L21 6m-17.25 1.5v7.5m-16.5 0h16.5M3.75 12h16.5m-16.5 5.25h16.5m-16.5 0v-7.5m16.5 0v7.5M10.5 21l-7.5-7.5m10.5-1.5L21 6m-17.25 1.5L21 6m-17.25 1.5v7.5m-16.5 0h16.5M3.75 12h16.5m-16.5 5.25h16.5m-16.5 0v-7.5m16.5 0v7.5"
                        />
                      </svg>
                    }
                  >
                    {language === "ar" ? "English" : "العربية"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
