import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { Button } from "../../components/ui";

const SmartAutomation = () => {
  const navigate = useNavigate();
  usePageTitle("smartAutomation");

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("cta");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Smart Automation | Shad</title>
        <meta
          name="description"
          content="Smart automation solutions by Shad. Transform your home with advanced smart systems and security."
        />
      </Helmet>
      <main className="container mx-auto px-4 py-16 rtl">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            الأتمتة الذكية
          </h1>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              حلول الأتمتة الذكية
            </h2>
            <p className="text-gray-600 mb-6">
              نقدم حلول متكاملة لتحويل منزلك إلى منزل ذكي يمكن التحكم فيه عن
              بعد، مع أنظمة أمان متطورة. نساعدك في جعل حياتك أكثر راحة وأماناً
              من خلال أحدث تقنيات المنزل الذكي.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <article className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  أنظمة المنزل الذكي
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>التحكم في الإضاءة</li>
                  <li>التحكم في التكييف</li>
                  <li>التحكم في الستائر</li>
                  <li>أنظمة الصوت والفيديو</li>
                </ul>
              </article>

              <article className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  أنظمة الأمان
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>كاميرات مراقبة ذكية</li>
                  <li>أنظمة الإنذار</li>
                  <li>أقفال ذكية</li>
                  <li>أنظمة كشف الدخان والحرائق</li>
                </ul>
              </article>
            </section>

            <section className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                مميزات أنظمتنا
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>تحكم كامل عن بعد عبر الهاتف</li>
                <li>تكامل مع المساعدات الصوتية</li>
                <li>توفير في استهلاك الطاقة</li>
                <li>سهولة الاستخدام والصيانة</li>
                <li>دعم فني متواصل</li>
              </ul>
            </section>
          </section>

          <div className="text-center">
            <Button
              variant="primary"
              onClick={handleContactClick}
              className="rounded-lg"
            >
              احصل على عرض
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default SmartAutomation;
