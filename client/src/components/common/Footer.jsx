import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import { blogService } from "../../shared/services/blogService";

// SVG Icons
const SnapchatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.902 2.168-2.902 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.510-.7-2.448-2.78-2.448-4.583 0-3.747 2.721-7.191 7.835-7.191 4.115 0 7.31 2.934 7.31 6.855 0 4.094-2.582 7.376-6.166 7.376-1.209 0-2.357-.629-2.746-1.378l-.753 2.87c-.283 1.102-1.047 2.482-1.555 3.322 1.139.35 2.341.535 3.588.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const MapMarkerIcon = () => (
  <svg width="50" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const TiktokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const Footer = () => {
  const { language, direction } = useLanguage();
  const [latestBlogs, setLatestBlogs] = useState([]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await blogService.getBlogs({
          page: 1,
          limit: 4,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setLatestBlogs(response.data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };
    fetchLatestBlogs();
  }, []);

  const translations = {
    ar: {
      aboutCompany: "عن الشركة",
      companyDescription:
        "شركة شاد هي شركة مقاولات احترافية منذ 2003 تبدأ من التصميم مروراً بالتشطيب الى التأثيث تحت مظلة واحدة، ومتخصصة في الديكور. وفي شاد تعتبر مشاريع عملائنا سكني كان أو تجاري هي في الأساس محور عملنا سنوات طويلة، لذا نحاول دائماً أن نكون في مستوى تطلعات وأحلام عملائنا.",
      contactUs: "تواصل معنا",
      riyadhAddress:
        "الرياض . حي الربيع . طريق الامير محمد بن سلمان . ابراج الربيع . الدور الثالث . المملكة العربية السعودية",
      dhahranAddress:
        "الظهران . حي القصور . طريق الامير محمد بن فهد . مبنى ديوان الاداري . الدور الثالث . مكتب 6 . المملكة العربية السعودية",
      mobile: "جوال",
      phone: "هاتف",
      email: "بريد إلكتروني",
      latestArticles: "آخر المقالات",
      importantLinks: "روابط مهمة",
      commercialDesign: "التصميم التجاري",
      exteriorDesign: "التصميم الخارجي",
      interiorDesign: "التصميم الداخلي",
      landscapeDesign: "تصميم الحدائق",
      decorationImplementation: "تنفيذ الديكور",
      allRightsReserved: "جميع الحقوق محفوظة.",
      termsOfService: "شروط الخدمة",
      privacyPolicy: "سياسة الخصوصية",
      legal: "قانوني",
    },
    en: {
      aboutCompany: "About the Company",
      companyDescription:
        "Shad Company is a professional contracting company since 2003, starting from design through finishing to furnishing under one umbrella, specializing in interior design. In Shad, our clients' residential or commercial projects are essentially the focus of our long-term work, so we always strive to be at the level of their aspirations and dreams.",
      contactUs: "Contact Us",
      riyadhAddress:
        "Riyadh. Al Rabie District. Prince Mohammed bin Salman Road. Al Rabie Towers. 3rd Floor. Kingdom of Saudi Arabia",
      dhahranAddress:
        "Dhahran. Al Qusour District. Prince Mohammed bin Fahd Road. Administrative Office Building. 3rd Floor. Office 6. Kingdom of Saudi Arabia",
      mobile: "Mobile",
      phone: "Phone",
      email: "Email",
      latestArticles: "Latest Articles",
      importantLinks: "Important Links",
      commercialDesign: "Commercial Design",
      exteriorDesign: "Exterior Design",
      interiorDesign: "Interior Design",
      landscapeDesign: "Landscape Design",
      decorationImplementation: "Decoration Implementation",
      allRightsReserved: "All Rights Reserved.",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      legal: "Legal",
    },
  };

  const t = translations[language];

  const socialLinks = [
    {
      icon: <SnapchatIcon />,
      url: "https://www.snapchat.com/add/ecosus_inc?share_id=jiXCm3QX5yU&locale=ar-AE",
      label: "Snapchat",
    },
    {
      icon: <TiktokIcon />,
      url: "https://www.tiktok.com/@ecosus_inc?_t=ZS-8tzGIMo3AsC&_r=1",
      label: "TikTok",
    },
    {
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/ecosus_inc/?utm_source=qr&igsh=MXEzdjh3Zno2bzNrYw%3D%3D#",
      label: "Instagram",
    },
    {
      icon: <TwitterIcon />,
      url: "https://x.com/Ecosus_inc?t=FY8m15A-VDdVVjbMmLeZsw&s=09",
      label: "Twitter",
    },
  ];

  const importantLinksData = [
    { text: t.commercialDesign, to: "services/commercial-design" },
    { text: t.exteriorDesign, to: "services/exterior-design" },
    { text: t.interiorDesign, to: "services/interior-design" },
    { text: t.landscapeDesign, to: "services/garden-design" },
    { text: t.decorationImplementation, to: "services/decoration-design" },
  ];

  const legalLinksData = [
    { text: t.termsOfService, to: "/terms" },
    { text: t.privacyPolicy, to: "/privacy" },
  ];

  return (
    <footer
      className={`bg-gray-900 text-gray-200 py-8 md:py-12 ${
        direction === "rtl" ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${
            direction === "rtl" ? "rtl-grid" : "ltr-grid"
          }`}
        >
          {/* About the Company */}
          <div
            className={`${
              direction === "rtl" ? "text-right" : "text-left"
            } space-y-4`}
          >
            <h4 className="text-lg md:text-xl font-bold">{t.aboutCompany}</h4>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t.companyDescription}
            </p>
            <div
              className={`flex flex-wrap ${
                direction === "rtl" ? "space-x-reverse space-x-3" : "space-x-3"
              } gap-y-2`}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 p-1"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div
            className={`${
              direction === "rtl" ? "text-right" : "text-left"
            } space-y-4`}
          >
            <h4 className="text-lg md:text-xl font-bold">{t.contactUs}</h4>
            <ul
              className={`space-y-3 text-sm md:text-base ${
                direction === "rtl" ? "rtl-list" : "ltr-list"
              }`}
            >
              <li
                className={`flex items-start ${
                  direction === "rtl"
                    ? "flex-row-reverse ltr gap-2"
                    : "flex-row gap-2"
                }`}
              >
                <MapMarkerIcon className="flex-shrink-0 mt-1" />
                <span className="text-gray-300">{t.riyadhAddress}</span>
              </li>

              <li
                className={`flex items-center ${
                  direction === "rtl"
                    ? "flex-row-reverse ltr gap-2"
                    : "flex-row gap-2"
                }`}
              >
                <PhoneIcon className="flex-shrink-0" />
                <span className="text-gray-300">{t.phone}: +966558813386</span>
              </li>
              <li
                className={`flex items-center ${
                  direction === "rtl"
                    ? "flex-row-reverse ltr gap-2"
                    : "flex-row gap-2"
                }`}
              >
                <EnvelopeIcon className="flex-shrink-0" />
                <span className="text-gray-300">
                  {t.email}: info@ecosus.com.sa
                </span>
              </li>
            </ul>
          </div>

          {/* Latest Articles */}
          <div
            className={`${
              direction === "rtl" ? "text-right" : "text-left"
            } space-y-4`}
          >
            <h4 className="text-lg md:text-xl font-bold">{t.latestArticles}</h4>
            <ul className="space-y-3 text-sm md:text-base">
              {latestBlogs.map((article) => (
                <li key={article._id} className="mb-3 last:mb-0">
                  <div className="text-gray-400 text-xs mb-1">
                    {new Date(article.publishedAt).toLocaleDateString(
                      language === "ar" ? "ar-EG" : "en-US"
                    )}
                  </div>
                  <RouterLink
                    to={`/blogs/${article._id}`}
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-yellow-400 leading-relaxed line-clamp-2"
                  >
                    {language === "ar" ? article.title : article.title}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links and Legal Links - Combined on mobile */}
          <div
            className={`${
              direction === "rtl" ? "text-right" : "text-left"
            } space-y-6 md:space-y-8`}
          >
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-bold">
                {t.importantLinks}
              </h4>
              <ul className="space-y-2 text-sm md:text-base">
                {importantLinksData.map((link, index) => (
                  <li key={index}>
                    <RouterLink
                      to={link.to}
                      onClick={handleLinkClick}
                      className="text-gray-300 hover:text-yellow-400 block py-1"
                    >
                      {link.text}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-bold">{t.legal}</h4>
              <ul className="space-y-2 text-sm md:text-base">
                {legalLinksData.map((link, index) => (
                  <li key={index}>
                    <RouterLink
                      to={link.to}
                      onClick={handleLinkClick}
                      className="text-gray-300 hover:text-yellow-400 block py-1"
                    >
                      {link.text}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex ${
            direction === "rtl" ? "justify-end" : "justify-center"
          }`}
        >
          <p className="text-gray-400 text-xs md:text-sm text-center">
            &copy; {new Date().getFullYear()} شركة شاد. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
