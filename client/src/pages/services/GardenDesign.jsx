import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const GardenDesign = () => {
  const navigate = useNavigate();
  usePageTitle("gardenDesign");
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
        <title>Garden Design | Shad</title>
        <meta
          name="description"
          content="Professional garden design services by Shad. We create innovative and practical garden solutions for your home."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-16 rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            تصميم الحدائق المنزلية في الدمام
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              تصميم الحدائق في الدمام: لماذا يجب أن تحصل على مصمم حدائق محترف؟
            </h2>
            <p className="text-gray-600 mb-4">
              نقدم في "Ecosus" لتصميم الحدائق أفضل الخدمات في الدمام والمناطق
              المجاورة. فريقنا من المصممين الخبراء يضمن تصميمًا مبتكرًا وعمليًا
              لحديقتك.
            </p>
            <p className="text-gray-600 mb-4">
              اختيار مصمم حدائق محترف يضمن لك جودة العمل ويساعدك في تصميم حديقة
              مثالية. نحن نلتزم بالمعايير العالمية ونقدم لك أفضل التصميمات.
            </p>
            <p className="text-gray-600">
              في "Ecosus للتصميم"، نهتم بتحويل رؤيتك إلى واقع. فريقنا من المهندسين
              والمصممين يضمن تنفيذ تصميمك بدقة واحترافية.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              تكلفة تصميم الحدائق المنزلية في الدمام؟
            </h2>
            <p className="text-gray-600 mb-4">
              تتوقف تكلفة تصميم الحدائق على حجم المشروع، نوع النباتات، وعناصر
              التصميم المستخدمة. نقدم أسعارًا تنافسية تناسب ميزانيتك. اتصل بنا
              للحصول على استشارة مجانية وعرض أسعار مفصل.
            </p>
            <p className="text-gray-600">
              في "Ecosus للتصميم"، نسعى لتقديم أفضل الخدمات بأقل التكاليف. نضمن لك
              جودة عالية ورضا تام عن النتائج.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              اتصل بنا للاستشارة مجانية
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              كيف يتم تصميم الحدائق المنزلية في Ecosus في الدمام؟
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li>
                <p className="font-semibold text-blue-900 inline">
                  الاستشارة الأولية:{" "}
                </p>
                نجلس معك لفهم احتياجاتك، وأسلوبك المفضل، والميزانية المتاحة.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  التصميم الأولي:{" "}
                </p>
                نقوم بإنشاء مخططات أولية للحديقة، بما في ذلك اختيار النباتات،
                والمواد، وعناصر التصميم الأخرى.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  التصميم التفصيلي:{" "}
                </p>
                بعد الموافقة على التصميم الأولي، نقوم بتطوير رسومات مفصلة ثلاثية
                الأبعاد، وتقديم لوحات تنفيذية.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  التنفيذ والإشراف:{" "}
                </p>
                نتولى عملية التنفيذ والإشراف على المشروع، لضمان جودة العمل
                والالتزام بالمواعيد.
              </li>
            </ol>
            <p className="text-gray-600 mt-4">
              في "Ecosus للتصميم"، نضمن لك حديقة جميلة وعملية. فريقنا من المتخصصين
              يعملون بجد لتحقيق رؤيتك. نقدم لك أفضل الخدمات.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenDesign;
