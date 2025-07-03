import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

const ContactSection = () => {
  const { t, direction } = useLanguage();

  const contactInfo = [
    {
      icon: (
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      title: t("sections.contact.contactInfo.address.title"),
      details: t("sections.contact.contactInfo.address.details", {
        returnObjects: true,
      }),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
      title: t("sections.contact.contactInfo.phone.title"),
      details: t("sections.contact.contactInfo.phone.details", {
        returnObjects: true,
      }),
    },
    {
      icon: (
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
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.902l-5.413 3.865a1.875 1.875 0 01-2.597 0L3.27 8.892A2.25 2.25 0 012.25 6.993V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.902l-5.413 3.865a1.875 1.875 0 01-2.597 0L3.27 8.892A2.25 2.25 0 012.25 6.993V6.75"
          />
        </svg>
      ),
      title: t("sections.contact.contactInfo.email.title"),
      details: t("sections.contact.contactInfo.email.details", {
        returnObjects: true,
      }),
    },
    {
      icon: (
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
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("sections.contact.contactInfo.hours.title"),
      details: t("sections.contact.contactInfo.hours.details", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <section id="contact" className={`py-16 bg-[#F5EFE6] mt-16 ${direction}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-teal mb-4">
            {t("sections.contact.title")}
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-accent-teal mb-6">
              {t("sections.contact.contactInfo.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-accent-gold mt-1">{info.icon}</div>
                  <div>
                    <h4 className="font-bold text-accent-teal mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className={`text-gray-600 mb-1 ${
                          info.title ===
                          t("sections.contact.contactInfo.phone.title")
                            ? "ltr"
                            : ""
                        }`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-accent-teal mb-6">
              {t("sections.contact.location.title")}
            </h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5561.634353191113!2d39.20222534907363!3d21.509848873335592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cf441b743755%3A0xcef07b4313c04941!2zRWNvc3VzINij2LXZiNmEINin2YTYp9iz2KrYr9in2YXYqQ!5e0!3m2!1sar!2seg!4v1751473625446!5m2!1sar!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
