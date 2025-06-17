import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { FEATURE2_IMAGE } from "../../constants/images";

const ExteriorDesign = () => {
  const navigate = useNavigate();
  usePageTitle("exteriorDesign");

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
        <title>Exterior Design | Shad</title>
        <meta
          name="description"
          content="Professional exterior design services by Shad. We create unique and beautiful building facades and outdoor spaces."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-16 rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            التصميم الخارجي
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 mb-4">
              من أجل أن نتجاوز التصميم الخارجي يجب أن نرى في الفضاء المحيط بنا.
              لقد نقوم بدراسة المساحة والواجهة والخواص الجمالية. إننا نصمم خارجي
              جميل ويناسب إحتياجات العملاء.
            </p>
            <p className="text-gray-600 mb-4">
              من خلال التصميم الخارجي لشركة شاد، نستطيع بناء واجهة مميزة، كما أن
              لدينا خبرة في اختيار المواد والتشطيبات لضمان أفضل النتائج. "شاد"
              للتصميم الخارجي يقدم أحدث التصميمات والحلول.
            </p>
            <p className="text-gray-600">
              يساعدك في التصميم الخارجي بشكل محترف، ويضمن لك أن تصميمك النهائي
              فريد من نوعه. نقدم لك تصميمات مبتكرة، تبرز جمال المبنى.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              شركة شاد للتصميم الخارجي في الدمام تقدم لك
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>التصميم الخارجي للمباني السكنية</li>
              <li>التصميم الخارجي للفيلات والقصور</li>
              <li>التصميم الخارجي للمكاتب والمباني التجارية</li>
              <li>التصميم الخارجي للمساحات العامة والحدائق</li>
              <li>تحديث وتجديد الواجهات الخارجية</li>
              <li>الإشراف على تنفيذ التصميم</li>
            </ul>
            <p className="text-gray-600 mt-4">
              هذه ليست هي عملية التصميم. نقوم في فن العمارة وتصميم المباني
              بإختيار كل شيء من العمارة الخارجية، سواء كانت واجهة معقدة أو
              بسيطة. نستخدم أحدث التقنيات والبرامج لإنشاء تصميمات مبتكرة.
            </p>
            <p className="text-gray-600">
              إن هذه الخدمات تقدم من "شاد للتصميم الخارجي" مع فريق متخصص من
              المهندسين والمصممين. نضمن جودة عالية في كل مرحلة.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              متميزون في عمليات التصميم الخارجي:
            </h2>
            <p className="text-gray-600 mb-4">
              إن شركة "شاد للتصميم الداخلي" في الدمام أو في أي مدينة أخرى في
              الخليج العربي، متميزة في تصميم خارجي. فريقنا يعمل بجد لتقديم أفضل
              التصاميم والحلول.
            </p>
            <p className="text-gray-600">
              جميع موظفينا في "شاد للتصميم" يعملون على إبراز خبرتهم في التصميم
              الخارجي. نضمن لك دقة واحترافية في كل مشروع.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              تواصل معنا الآن
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              ماذا يعني التصميم الخارجي لشركة شاد
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <img
                  src={FEATURE2_IMAGE}
                  alt="Placeholder"
                  className="mb-4"
                  loading="lazy"
                />
                <p className="text-gray-600 text-center">
                  تصميماتنا هي الحل الأمثل للمباني الحديثة. نقدم تصاميم فريدة من
                  نوعها تعكس أسلوبك وتلبي احتياجاتك.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img src={FEATURE2_IMAGE} alt="Placeholder" className="mb-4" />
                <p className="text-gray-600 text-center">
                  نقدم لك تصاميم عالية الجودة، نضمن تنفيذًا دقيقًا واستخدام أفضل
                  المواد. فريقنا يعمل باحترافية.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={FEATURE2_IMAGE}
                  alt="Placeholder"
                  className="mb-4"
                  loading="lazy"
                />
                <p className="text-gray-600 text-center">
                  هدفنا هو تحقيق رؤيتك. نقدم استشارات مجانية ونساعدك في كل
                  مرحلة. نحن نلتزم بالجودة والابتكار.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              استشارة مجانية عن التصميم الخارجي. تواصل معنا الآن للحصول على
              استشارة مجانية بشأن أفضل من مشروعاتك.
            </h2>
            <div className="text-center">
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
      </div>
    </>
  );
};

export default ExteriorDesign;
