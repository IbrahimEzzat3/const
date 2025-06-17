import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  ar: {
    home: "شاد - الصفحة الرئيسية",
    blogs: "شاد - المدونة",
    interiorDesign: "شاد - التصميم الداخلي",
    exteriorDesign: "شاد - التصميم الخارجي",
    gardenDesign: "شاد - تصميم الحدائق",
    smartAutomation: "شاد - الأتمتة الذكية",
    trainingCourses: "شاد - الدورات التدريبية",
    costCalculator: "شاد - حاسبة التكلفة",
    terms: "شاد - شروط الخدمة",
    privacy: "شاد - سياسة الخصوصية",
    furniture: "شاد - مشاريع الأثاث",
    hospitality: "شاد - مشاريع الضيافة",
    residential: "شاد - المشاريع السكنية",
    landscape: "شاد - مشاريع اللاندسكيب",
    commercial: "شاد - المشاريع التجارية",
    "administrative-offices": "شاد - المكاتب الإدارية",
    styles: "شاد - الطرز المعمارية",
    decoration: "شاد - الديكور",
    notFound: "شاد - خطأ",
    feedback: "شاد - اراء عملائنا",
    testimonial: "شاد - شاركنا قصتك",
    calc: "شاد - حاسبة تكلفة البناء",
    "neo-classic": "شاد - طراز نيو كلاسيك",
    modern: "شاد - حديث",
    concept: "شاد - واي ساب",
    design: "شاد - التصميم",
    classic: "شاد - الكلاسيكي",
    industrial: "شاد - الصناعي",
    course: "شاد - التدريب",
    Consultations: "شاد - استشاراتي",
    profile: "شاد - الملف الشخصي",
    login: "شاد - تسجيل الدخول",
    register: "شاد - انشاء حساب",
    forgot: "شاد - هل نسيت كلمة السر",
    dashboard: "شاد - لوحة التحكم",
  },
  en: {
    home: "Shad - Home",
    about: "Shad - About Us",
    services: "Shad - Our Services",
    projects: "Shad - Our Projects",
    blogs: "Shad - Blogs",
    contact: "Shad - Contact Us",
    interiorDesign: "Shad - Interior Design",
    exteriorDesign: "Shad - Exterior Design",
    gardenDesign: "Shad - Garden Design",
    smartAutomation: "Shad - Smart Automation",
    trainingCourses: "Shad - Training Courses",
    costCalculator: "Shad - Cost Calculator",
    terms: "Shad - Terms of Service",
    privacy: "Shad - Privacy Policy",
    furniture: "Shad - Furniture Projects",
    hospitality: "Shad - Hospitality Projects",
    residential: "Shad - Residential Projects",
    landscape: "Shad - Landscape Projects",
    commercial: "Shad - Commercial Projects",
    "administrative-offices": "Shad - Administrative Offices",
    styles: "Shad - Architectural Styles",
    decoration: "Shad - Decoration",
    notFound: "Shad - Error",
    feedback: "Shad - Feedback",
    testimonial: "Shad - Share Your Story",
    calc: "Shad - Cost Calculator",
    "neo-classic": "Shad - New Classic",
    modern: "Shad - Modern",
    concept: "Shad - concept",
    design: "Shad - Design",
    classic: "Shad - Classic",
    industrial: "Shad - Industrial",
    course: "Shad - Training Course",
    Consultations: "Shad - My Consultations",
    profile: "Shad - My Profile",
    login: "Shad - Login",
    register: "Shad - Register",
    forgot: "Shad - Forgot Password",
    dashboard: "Shad - Admin Dashboard",
  },
};

const usePageTitle = (pageKey) => {
  const { language } = useLanguage();

  useEffect(() => {
    const title =
      translations[language][pageKey] || translations[language].home;
    document.title = title;
  }, [pageKey, language]);
};

export default usePageTitle;
