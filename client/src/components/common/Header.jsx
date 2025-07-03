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
    courses: "الدورات تدريبية",
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
    requestPrice: "طلب عرض سعر",
    waterFarmingAssociation: "جمعية الإستزراع المائي",
    registration: "التسجيل في الجمعية",
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
    requestPrice: "Request a quote",
    waterFarmingAssociation: "Water Farming Association",
    registration: "Registration",
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
      label: t.services,
      onClick: () => {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => scrollToSection("services"), 100);
        } else {
          scrollToSection("services");
        }
      },
      isScrollLink: true,
    },
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
    { label: t.courses, path: "/courses" },
    {
      label: t.waterFarmingAssociation,
      path: "https://www.aesweb.org/about",
      external: true,
    },
    {
      label: t.registration,
      path: "https://www.aesweb.org/members/join2",
      external: true,
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
    { label: t.blogs, path: "/blogs" },
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
          className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-accent-gold"
        >
          {item.label}
        </Link>
      );
    }

    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-accent-gold"
        >
          {item.label}
        </a>
      );
    }

    if (item.submenu) {
      return (
        <div key={item.path} className="relative group">
          <Link
            to={item.path}
            className={`relative text-accent-gold px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              location.pathname.startsWith(item.path)
                ? "text-accent-gold"
                : "text-accent-teal hover:text-accent-gold"
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
                    ? "text-accent-gold bg-primary-50"
                    : "text-accent-teal hover:bg-secondary-50 hover:text-accent-gold"
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
        className={`relative text-accent-gold px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-accent-gold"
            : "text-accent-gold hover:text-accent-gold"
        }`}
      >
        {item.label}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold" />
        )}
      </Link>
    );
  };

  const renderMobileMenuItem = (item) => (
    <div key={item.label} className="space-y-1">
      {item.isScrollLink ? (
        <button
          onClick={item.onClick}
          className="block w-full px-3 py-2 text-base font-medium rounded-lg text-accent-gold hover:bg-accent-teal hover:text-white text-left"
        >
          {item.label}
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className={`block px-3 py-2 text-base font-medium rounded-lg ${
            location.pathname === item.path
              ? "bg-accent-gold text-accent-teal"
              : "text-accent-teal hover:bg-accent-gold hover:text-accent-teal"
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
                  ? "bg-accent-gold text-accent-teal"
                  : "text-accent-teal hover:bg-accent-gold hover:text-accent-teal"
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
        className={`bg-accent-green py-2 px-4 ${
          direction === "rtl" ? "rtl" : "ltr"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Button
              variant="ghost"
              onClick={handleConsultationClick}
              className="text-center text-white bg-transparent hover:bg-accent-teal whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              {t.freeConsultation}
            </Button>
            <Link
              to="/services/cost-calculator"
              className="text-center bg-transparent hover:bg-accent-teal hover:text-white text-white px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-full flex items-center justify-center whitespace-nowrap transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                />
              </svg>

              {t.costCalculator}
            </Link>
            <a
              href="https://wa.me/966558813386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-transparent hover:bg-accent-teal hover:text-white text-white px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-full flex items-center justify-center whitespace-nowrap transition duration-300"
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
            <a
              href="https://wa.me/966558813386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center  hover:bg-accent-teal hover:text-white text-white px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-full flex items-center justify-center whitespace-nowrap transition duration-300"
            >
              <img
                src="/images/wired-outline-955-demand-morph-coin.svg"
                alt="Request Price"
                className="w-6 h-6 mr-2 text-accent-gold"
              />
              {t.requestPrice}
            </a>
          </div>
        </div>
      </div>

      {/* Existing Header */}
      <header
        className={`bg-white rounded-b-3xl shadow-sm ${
          direction === "rtl" ? "rtl" : "ltr"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 transition-colors duration-200"
            >
              <img
                src="/images/logos/logo.png"
                alt="Company Logo"
                className="h-16 w-auto object-cover aspect-auto "
                fetchpriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden text-accent-gold md:flex md:items-center md:space-x-1">
              {menuItems.map((item) => renderMenuItem(item))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4 ">
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="text-accent-gold bg-transparent hover:text-accent-gold"
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
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.6 9h16.8M3.6 15h16.8"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3a15 15 0 0 1 0 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3a15 15 0 0 0 0 18"
                      />
                    </svg>
                  }
                ></Button>
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-soft-2xl ring-1 ring-black ring-opacity-5">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleLanguage("ar");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full justify-start bg-transparent text-accent-teal hover:text-accent-gold"
                    >
                      العربية
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleLanguage("en");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full justify-start bg-transparent text-accent-teal hover:text-accent-gold"
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
                            ? `https://const-production.up.railway.app/${user.avatar}`
                            : `/public/images/default.png`
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
                <></>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-accent-teal hover:text-accent-gold hover:bg-accent-teal"
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
                                ? `https://const-production.up.railway.app/${user.avatar}`
                                : `/public/images/default.png`
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
                  ""
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
                          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.6 9h16.8M3.6 15h16.8"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3a15 15 0 0 1 0 18"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3a15 15 0 0 0 0 18"
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
