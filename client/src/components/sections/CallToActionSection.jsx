import React, { useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import CustomAlert from "../../shared/components/CustomAlert";

const CallToActionSection = () => {
  const { t, direction, language } = useLanguage();
  const [showCallAlert, setShowCallAlert] = useState(false);
  const [showWhatsappAlert, setShowWhatsappAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "",
    otherType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the WhatsApp message with the form data
    let typeText = formData.type;
    if (formData.type === "أخرى" && formData.otherType) {
      typeText = formData.otherType;
    }
    const whatsappMessage =
      language === "ar"
        ? `مرحباً، أنا ${formData.name}%0A%0Aرقم الجوال: ${formData.phone}%0A%0Aنوع الاستشارة: ${typeText}`
        : `Hello, I am ${formData.name}%0A%0APhone: ${formData.phone}%0A%0AConsultation Type: ${typeText}`;

    // WhatsApp number (replace with your actual number)
    const whatsappNumber = "966558813386";

    // Redirect to WhatsApp with the pre-filled message
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCallConfirm = () => {
    window.location.href = "tel:+966558813386";
  };

  const handleWhatsappConfirm = () => {
    let typeText = formData.type;
    if (formData.type === "أخرى" && formData.otherType) {
      typeText = formData.otherType;
    }
    const whatsappMessage =
      language === "ar"
        ? `مرحباً، أنا ${formData.name}%0A%0Aرقم الجوال: ${formData.phone}%0A%0Aنوع الاستشارة: ${typeText}`
        : `Hello, I am ${formData.name}%0A%0APhone: ${formData.phone}%0A%0AConsultation Type: ${typeText}`;
    const whatsappNumber = "966558813386";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <section
      id="cta"
      className={`py-16 bg-[#F5EFE6] mt-16  rounded-3xl ${direction}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent-teal">
            {t("sections.callToAction.title")}
          </h2>
          <p className="text-lg text-accent-teal mb-8 max-w-2xl mx-auto">
            {t("sections.callToAction.subtitle")}
          </p>
          <div className="w-36 h-1 bg-accent-gold mt-4 mb-8 mx-auto"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <button
              onClick={() => setShowCallAlert(true)}
              className="bg-white text-accent-teal font-bold py-4 px-6 rounded-full transition duration-300 flex items-center justify-center gap-3 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5.75a2 2 0 012-2h2.25a.75.75 0 01.75.75v2.084a.75.75 0 01-.248.558l-1.5 1.375a16.5 16.5 0 007.25 7.25l1.375-1.5a.75.75 0 01.558-.248h2.084a.75.75 0 01.75.75V19a2 2 0 01-2 2h-.75C9.179 21 3 14.821 3 7.75V5.75z"
                />
              </svg>
              <span>{t("sections.callToAction.callUs")}</span>
            </button>
            <button
              onClick={() => setShowWhatsappAlert(true)}
              className="bg-accent-gold text-accent-teal font-bold py-4 px-6 rounded-full transition duration-300 flex items-center justify-center gap-3 hover:bg-accent-gold/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t("sections.callToAction.whatsapp")}</span>
            </button>
          </div>

          <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {t("sections.callToAction.getQuote.title")}
            </h3>
            <p className="text-accent-teal mb-6">
              {t("sections.callToAction.getQuote.subtitle")}
            </p>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("sections.callToAction.getQuote.name")}
                  className="w-full px-4 py-3 rounded-lg bg-white  border border-white text-accent-teal placeholder-gray-300 focus:outline-none focus:border-accent-gold"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("sections.callToAction.getQuote.phone")}
                  className={` ${direction} w-full px-4 py-3 rounded-lg bg-white  border border-white text-accent-teal placeholder-gray-300 focus:outline-none focus:border-accent-gold`}
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white  border border-white text-accent-teal focus:outline-none focus:border-accent-gold"
                  required
                >
                  <option value="" disabled>
                    {t("sections.callToAction.getQuote.type")}
                  </option>
                  <option value="إنشائية">إنشائية</option>
                  <option value="معمارية">معمارية</option>
                  <option value="داخلية وتأثيث">داخلية وتأثيث</option>
                  <option value="أنظمة الاستزراع المائي">
                    أنظمة الاستزراع المائي
                  </option>
                  <option value="دراسة المشاريع القائمة">
                    دراسة المشاريع القائمة
                  </option>
                  <option value="الأنظمة الذكية">الأنظمة الذكية</option>
                  <option value="الواقع الافتراضي">الواقع الافتراضي</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
              {formData.type === "أخرى" && (
                <textarea
                  name="otherType"
                  value={formData.otherType}
                  onChange={handleChange}
                  placeholder={t(
                    "sections.callToAction.getQuote.otherTypePlaceholder",
                    "حدد نوع الاستشارة"
                  )}
                  rows="2"
                  className="w-full px-4 py-3 rounded-lg  bg-white  border border-white text-accent-teal placeholder-gray-300 focus:outline-none focus:border-accent-gold mb-4"
                  required
                ></textarea>
              )}
              <button
                type="submit"
                className="w-full bg-accent-gold hover:bg-accent-gold/90 text-accent-teal font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2"
              >
                <span>{t("sections.callToAction.getQuote.send")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      direction === "rtl"
                        ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    }
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <CustomAlert
        isOpen={showCallAlert}
        onClose={() => setShowCallAlert(false)}
        title={t("sections.callToAction.callAlert.title", "Call Us")}
        message={t(
          "sections.callToAction.callAlert.message",
          "Would you like to call us now"
        )}
        type="info"
        showCancelButton={true}
        confirmButtonText={t(
          "sections.callToAction.callAlert.confirm",
          "Call Now"
        )}
        cancelButtonText={t("sections.callToAction.callAlert.cancel", "Cancel")}
        onConfirm={handleCallConfirm}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5.75a2 2 0 012-2h2.25a.75.75 0 01.75.75v2.084a.75.75 0 01-.248.558l-1.5 1.375a16.5 16.5 0 007.25 7.25l1.375-1.5a.75.75 0 01.558-.248h2.084a.75.75 0 01.75.75V19a2 2 0 01-2 2h-.75C9.179 21 3 14.821 3 7.75V5.75z"
            />
          </svg>
        }
      />

      <CustomAlert
        isOpen={showWhatsappAlert}
        onClose={() => setShowWhatsappAlert(false)}
        title={t(
          "sections.callToAction.whatsappAlert.title",
          "Contact via WhatsApp"
        )}
        message={t(
          "sections.callToAction.whatsappAlert.message",
          "Would you like to send us a message on WhatsApp"
        )}
        type="info"
        showCancelButton={true}
        confirmButtonText={t(
          "sections.callToAction.whatsappAlert.confirm",
          "Open WhatsApp"
        )}
        cancelButtonText={t(
          "sections.callToAction.whatsappAlert.cancel",
          "Cancel"
        )}
        onConfirm={handleWhatsappConfirm}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        }
      />
    </section>
  );
};

export default CallToActionSection;
