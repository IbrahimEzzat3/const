import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const CommercialDesign = () => {
  const navigate = useNavigate();
  usePageTitle("commercial");

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
        <title>Commercial Design | Shad</title>
        <meta
          name="description"
          content="Professional commercial design services by Shad. We provide innovative and practical solutions for your business spaces."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-16 rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            يشمل التصميم التجاري في شركة شاد :
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 mb-4">
              نقدم في شركة شاد للتصميم الداخلي لمسة سحرية للواجهة التجارية،
              لتكون ممتعة وتجذب العملاء. نستخدم أحدث التقنيات والبرامج لتصميم
              الديكورات الداخلية والخارجية.
            </p>
            <p className="text-gray-600 mb-4">
              فريقنا من المصممين والمهندسين يعمل بجد لتقديم أفضل الحلول. نلتزم
              بالمواعيد ونضمن جودة عالية.
            </p>
            <p className="text-gray-600">
              إذا كنت تبحث عن تنفيذ ديكورات مميزة لمنزلك أو فندقك أو مكتبك أو
              محلك التجاري، فاتصل بنا الآن. فريقنا مستعد لتقديم أفضل الحلول.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              ما هي خطوات التصميم التجاري التي تستخدمها شاد؟
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li>
                <p className="font-semibold text-blue-900 inline">
                  الخطوة الأولى: استشارة مجانية:{" "}
                </p>
                يتم استلام طلبك وبدأ الاستشارة الأولية لفهم احتياجاتك وتوقعاتك.
                يتم تحديد الميزانية والجدول الزمني.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  الخطوة الثانية: مرحلة التصميم:{" "}
                </p>
                يتم إنشاء تصميمات أولية ومخططات. يتم عرضها للمناقشة وتلقي
                الملاحظات. يتم تعديل التصميم بناءً على ملاحظاتك.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  الخطوة الثالثة: تنفيذ التصميم التجاري:{" "}
                </p>
                يتم تنفيذ التصميم بعد الموافقة النهائية. يتم الإشراف على جميع
                مراحل العمل لضمان جودة عالية. يتم استخدام مواد عالية الجودة.
              </li>
            </ol>
            <p className="text-gray-600 mt-4">
              في "شاد للتصميم"، نضمن لك حديقة جميلة وعملية. فريقنا من المتخصصين
              يعملون بجد لتحقيق رؤيتك. نقدم لك أفضل الخدمات.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              الثقة بين شركة شاد للتصميم التجاري والعملاء
            </h2>
            <p className="text-gray-600 mb-4">
              "شاد للتصميم" تهتم ببناء علاقات قوية مع عملائها. نقدم خدمات شفافة
              ومهنية. نضمن رضا العملاء عن النتائج.
            </p>
            <p className="text-gray-600 mb-4">
              فريقنا من المصممين والمهندسين يعمل بجد لتقديم أفضل الحلول. نلتزم
              بالمواعيد والجودة.
            </p>
            <p className="text-gray-600">
              هدفنا هو تحقيق رؤيتك وتجاوز توقعاتك.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              بعض من الخدمات المرتبطة بـ التصميم التجاري:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>تخطيط المساحة</li>
              <li>اختيار الألوان والمواد</li>
              <li>تصميم الإضاءة</li>
              <li>توزيع الأثاث والديكورات</li>
              <li>تنفيذ المشروع بالكامل</li>
            </ul>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              تواصل معنا الآن للحصول على استشارة مجانية بشأن أفضل من مشروعاتك
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.671565356092!2d46.6752773!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ4LjgiTiA0NsKwNDAnMzEuMCJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Shad's Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommercialDesign;
