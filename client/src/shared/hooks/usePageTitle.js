import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  ar: {
    home: "Ecosus - الصفحة الرئيسية",
    blogs: "Ecosus - المدونة",
    interiorDesign: "Ecosus - التصميم الداخلي",
    exteriorDesign: "Ecosus - التصميم الخارجي",
    gardenDesign: "Ecosus - تصميم الحدائق",
    smartAutomation: "Ecosus - الأتمتة الذكية",
    trainingCourses: "Ecosus - الدورات التدريبية",
    costCalculator: "Ecosus - حاسبة التكلفة",
    terms: "Ecosus - شروط الخدمة",
    privacy: "Ecosus - سياسة الخصوصية",
    furniture: "Ecosus - مشاريع الأثاث",
    hospitality: "Ecosus - مشاريع الضيافة",
    residential: "Ecosus - المشاريع السكنية",
    landscape: "Ecosus - مشاريع اللاندسكيب",
    commercial: "Ecosus - المشاريع التجارية",
    "administrative-offices": "Ecosus - المكاتب الإدارية",
    styles: "Ecosus - الطرز المعمارية",
    decoration: "Ecosus - الديكور",
    notFound: "Ecosus - خطأ",
    feedback: "Ecosus - اراء عملائنا",
    testimonial: "Ecosus - شاركنا قصتك",
    calc: "Ecosus - حاسبة تكلفة البناء",
    "neo-classic": "Ecosus - طراز نيو كلاسيك",
    modern: "Ecosus - حديث",
    concept: "Ecosus - واي ساب",
    design: "Ecosus - التصميم",
    classic: "Ecosus - الكلاسيكي",
    industrial: "Ecosus - الصناعي",
    course: "Ecosus - التدريب",
    Consultations: "Ecosus - استشاراتي",
    profile: "Ecosus - الملف الشخصي",
    login: "Ecosus - تسجيل الدخول",
    register: "Ecosus - انشاء حساب",
    forgot: "Ecosus - هل نسيت كلمة السر",
    dashboard: "Ecosus - لوحة التحكم",
  },
  en: {
    home: "Ecosus- Home",
    about: "Ecosus- About Us",
    services: "Ecosus- Our Services",
    projects: "Ecosus- Our Projects",
    blogs: "Ecosus- Blogs",
    contact: "Ecosus- Contact Us",
    interiorDesign: "Ecosus- Interior Design",
    exteriorDesign: "Ecosus- Exterior Design",
    gardenDesign: "Ecosus- Garden Design",
    smartAutomation: "Ecosus- Smart Automation",
    trainingCourses: "Ecosus- Training Courses",
    costCalculator: "Ecosus- Cost Calculator",
    terms: "Ecosus- Terms of Service",
    privacy: "Ecosus- Privacy Policy",
    furniture: "Ecosus- Furniture Projects",
    hospitality: "Ecosus- Hospitality Projects",
    residential: "Ecosus- Residential Projects",
    landscape: "Ecosus- Landscape Projects",
    commercial: "Ecosus- Commercial Projects",
    "administrative-offices": "Ecosus- Administrative Offices",
    styles: "Ecosus- Architectural Styles",
    decoration: "Ecosus- Decoration",
    notFound: "Ecosus- Error",
    feedback: "Ecosus- Feedback",
    testimonial: "Ecosus- Share Your Story",
    calc: "Ecosus- Cost Calculator",
    "neo-classic": "Ecosus- New Classic",
    modern: "Ecosus- Modern",
    concept: "Ecosus- concept",
    design: "Ecosus- Design",
    classic: "Ecosus- Classic",
    industrial: "Ecosus- Industrial",
    course: "Ecosus- Training Course",
    Consultations: "Ecosus- My Consultations",
    profile: "Ecosus- My Profile",
    login: "Ecosus- Login",
    register: "Ecosus- Register",
    forgot: "Ecosus- Forgot Password",
    dashboard: "Ecosus- Admin Dashboard",
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
