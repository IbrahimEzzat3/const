import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const DecorationDesign = () => {
  const navigate = useNavigate();
  usePageTitle("decoration");

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
        <title>Decoration Design | Shad</title>
        <meta
          name="description"
          content="Expert decoration design and implementation services by Shad. We ensure beautiful and functional spaces for your needs."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-16 rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            تنفيذ الديكور الداخلي والخارجي
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 mb-4">
              تصميم منزلك أو مشروعك التجاري في الدمام سواء كان جديدًا أو تريد
              تجديدًا ليس سوى نصف الطريق. لضمان إكتمال النصف الطريق الآخر، هو
              التنفيذ!
            </p>
            <p className="text-gray-600 mb-4">
              كل تفصيل صغير يحتاج إلى دمج ومواد جميلة ليكون هذا في النهاية مناسب
              ومتناسق ومع التفاصيل الأخرى. عندما تستطيع توفير الكثير من الوقت
              والجهد والمال ولن تتوقع الحصول على الأفضل.
            </p>
            <p className="text-gray-600">
              فريق "Ecosusللتصميم" بالدمام خبراء متميزون على أيدي خبراء محليين في
              تنفيذ التصميم الداخلي والخارجي. نهتم بكافة التفاصيل لضمان تصميم
              جميل وعملي يلبي احتياجاتك.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              اتصل بنا لمناقشة مشروعك
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 mb-4">
              "Ecosusللتصميم" تقدم لك فريقًا من الاختصاصيين في تصميم الديكور، حيث
              تجمع بين الخبرة والإبداع لتطوير فكرتك وتنفيذها على أرض الواقع.
            </p>
            <p className="text-gray-600 mb-4">
              نحرص على تحقيق أعلى جودة في التنفيذ. نقدم لك خدماتنا بأسعار
              تنافسية مع ضمان جودة عالية.
            </p>
            <p className="text-gray-600">
              إذا كنت تبحث عن تنفيذ ديكورات مميزة لمنزلك أو فندقك أو مكتبك أو
              محلك التجاري، فاتصل بنا الآن. فريقنا مستعد لتقديم أفضل الحلول.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              اتصل بنا لمناقشة مشروعك
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              سعر تصميم وتنفيذ الديكور:
            </h2>
            <p className="text-gray-600 mb-4">
              في "Ecosusللتصميم" نضمن لك أعلى جودة ممكنة من ناحية الجودة والسعر.
              فريقنا من المهندسين والمصممين يعمل بجد لتقديم أفضل الحلول. نقدم لك
              خدماتنا بأسعار تنافسية. نضمن لك رضا العملاء.
            </p>
            <p className="text-gray-600">
              إذا وجدت شركة أخرى تقدم نفس الجودة بسعر أقل، فسوف نعدل لك السعر.
              هدفنا هو تحقيق رؤيتك وتجاوز توقعاتك.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              اتصل بنا لمناقشة مشروعك
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              شركة Ecosusللتصميم الداخلي تقدم لك:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>التصميم الداخلي</li>
              <li>التصميم الخارجي</li>
              <li>تصميم الحدائق</li>
              <li>تنفيذ الديكور الداخلي والخارجي</li>
              <li>الأعمال الإنشائية</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              لماذا يجب عليك أن تختار شركة Ecosusللتصميم الداخلي في الدمام؟
            </h2>
            <p className="text-gray-600 mb-4">
              "Ecosusللتصميم" تتمتع بخبرة تزيد عن 17 عامًا في مجال التصميم
              الداخلي والخارجي في الدمام. فريقنا من المهندسين والمصممين يضمن لك
              أعلى جودة في التنفيذ. نلتزم بالمواعيد ونقدم لك أفضل الخدمات.
            </p>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              أثناء العمل على مشروعك سنقدم لك ثلاث أعمدة رئيسية:
            </h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>أعلى جودة ممكنة</li>
              <li>أرخص سعر قد تجده في الرياض</li>
              <li>أفضل خدمة عملاء</li>
            </ol>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              اتصل بنا لمناقشة مشروعك
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DecorationDesign;
