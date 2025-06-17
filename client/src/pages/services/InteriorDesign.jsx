import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const InteriorDesign = () => {
  const navigate = useNavigate();
  usePageTitle("interiorDesign");
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
        <title>Interior Design | Shad</title>
        <meta
          name="description"
          content="Professional interior design services by Shad. We create beautiful and functional living and working spaces."
        />
      </Helmet>
      <main className="container mx-auto px-4 py-16 rtl">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            التصميم الداخلي في الدمام: منزلك يعكس شخصيتك <br /> ويحكي قصتك...
          </h1>

          <section className="mb-8">
            <img
              src="../images/projects/main/feature2.webp"
              alt="Interior Design"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 mb-4">
              التصميم الداخلي هو التعبير الإبداعي لتصميم وتخطيط المساحات في فن
              العمارة الداخلية. تهدف خدماتنا في "شركة شاد" للتصميم الداخلي في
              الدمام إلى تحويل منزلك إلى مساحة فريدة تعكس أسلوبك وذوقك.
            </p>
            <p className="text-gray-600 mb-4">
              هناك فن لهذه الأيام ضرورية لخلق بيئة مريحة وجميلة، سواء كانت شقة
              صغيرة أو فيلا فخمة. التصميم الداخلي يلعب دورًا مهمًا في إظهار جمال
              منزلك.
            </p>
            <p className="text-gray-600">
              "شركة شاد للتصميم الداخلي" تقدم لك رؤية متكاملة لخدمات تصميم داخلي
              فريدة من نوعها. هدفنا هو تحويل منزل أحلامك إلى حقيقة باستخدام أفضل
              التقنيات والبرامج.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              كيف تعمل شركة شاد للتصميم الداخلي؟
            </h2>
            <p className="text-gray-600">
              "شاد للتصميم" يضيفون لمسة إبداعية لكل تفصيل وعمل في مشروعك. نستخدم
              أحدث طرق التصميم وتصمدها مع أفضل التقنيات والبرامج. يتم دراسة
              المساحة وتحديد الاحتياجات وتصميم خطط مفصلة. نقوم بتنفيذ التصميم
              بعناية. "شاد للتصميم" يقدم خدمات التصميم الداخلي في الدمام مع فريق
              من المصممين والمهندسين. نضمن جودة عالية في كل مرحلة.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              أسعار التصميم الداخلي في الدمام:
            </h2>
            <p className="text-gray-600">
              تختلف أسعار التصميم الداخلي والتكاليف بناءً على متطلبات المشروع
              وحجم المساحة. نقدم أسعارًا تنافسية ونضمن جودة الخدمات. "شاد
              للتصميم" يقدم استشارة مجانية لمساعدتك في اتخاذ القرار.
            </p>
          </section>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              تواصل معنا الآن
            </button>
          </div>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              خلال الاستشارة المجانية عن التصميم الداخلي سنتكلم عن الأمور
              التالية:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>مساعدتك في تحديد احتياجاتك وتفضيلاتك في التصميم.</li>
              <li>مساعدتك في اختيار المواد والألوان المناسبة لمنزلك.</li>
              <li>تحديد الميزانية وتخطيط المشروع.</li>
              <li>توفير أفكار إبداعية ومبتكرة لتحويل المساحات.</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              ماهي مراحل التصميم الداخلي مع شركة شاد في الدمام:
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li>
                <p className="font-semibold text-blue-900 inline">
                  المرحلة الأولى: الاستشارة والتخطيط:{" "}
                </p>
                نقوم بفهم احتياجاتك وتفضيلاتك. يتم تحديد الميزانية وتوقعات
                المشروع. يتم جمع المعلومات لإنشاء رؤية مشتركة.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  المرحلة الثانية: التصميم والتخطيط:{" "}
                </p>
                يتم إنشاء تصاميم أولية ومخططات. يتم عرضها للمناقشة وتلقي
                الملاحظات. يتم تعديل التصميم بناءً على ملاحظاتك.
              </li>
              <li>
                <p className="font-semibold text-blue-900 inline">
                  المرحلة الثالثة: التنفيذ:{" "}
                </p>
                يتم تنفيذ التصميم بعد الموافقة النهائية. يتم الإشراف على جميع
                مراحل العمل لضمان جودة عالية. يتم استخدام مواد عالية الجودة.
              </li>
            </ol>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              الثقة بين شركة شاد للتصميم الداخلي والعملاء:
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
          </section>

          <div className="text-center">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              تواصل معنا الآن
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default InteriorDesign;
