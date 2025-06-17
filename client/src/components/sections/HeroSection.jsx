import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button } from "../ui";
import { FEATURE2_IMAGE } from "../../constants/images";

const translations = {
  ar: {
    slides: [
      {
        id: 1,
        text: "الرمال ممكن أن تصبح جنة تستمتع بها",
        image: FEATURE2_IMAGE,
      },
      {
        id: 2,
        text: "تصميمات داخلية عصرية تناسب ذوقك",
        image: FEATURE2_IMAGE,
      },
      {
        id: 3,
        text: "خارجية مبهرة تعكس فخامة منزلك",
        image: FEATURE2_IMAGE,
      },
      {
        id: 4,
        text: "حدائق خضراء تصبح ملاذك الخاص",
        image: FEATURE2_IMAGE,
      },
      {
        id: 5,
        text: "نحول رؤيتك إلى واقع ملموس",
        image: FEATURE2_IMAGE,
      },
      {
        id: 6,
        text: "معنا، كل زاوية تحكي قصة",
        image: FEATURE2_IMAGE,
      },
    ],
    logos: [
      {
        text: "التنفيذ والتأثيث",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "الاستشارات والاشراف",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "تصميم الحدائق",
        image: "images/logos/تصميم-الحدائق.svg",
      },
      {
        text: "التصميم الخارجي",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "التصميم الداخلي",
        image: "images/logos/التصميم-الداخلي.svg",
      },
    ],
    projects: [
      {
        id: 1,
        text: "اثاث",
        image: FEATURE2_IMAGE,
        link: "/projects/furniture",
      },
      {
        id: 2,
        text: "ضيافة",
        image: FEATURE2_IMAGE,
        link: "/projects/hospitality",
      },
      {
        id: 3,
        text: "سكني",
        image: FEATURE2_IMAGE,
        link: "/projects/residential",
      },
      {
        id: 4,
        text: "لاندسكيب",
        image: FEATURE2_IMAGE,
        link: "/projects/landscape",
      },
      {
        id: 5,
        text: "تجاري",
        image: FEATURE2_IMAGE,
        link: "/projects/commercial",
      },
      {
        id: 6,
        text: "مكاتب ادارية",
        image: FEATURE2_IMAGE,
        link: "/projects/administrative-offices",
      },
    ],
  },
  en: {
    slides: [
      {
        id: 1,
        text: "Sands can become a paradise you enjoy",
        image: FEATURE2_IMAGE,
      },
      {
        id: 2,
        text: "Modern interior designs to suit your taste",
        image: FEATURE2_IMAGE,
      },
      {
        id: 3,
        text: "Stunning exteriors that reflect the luxury of your home",
        image: FEATURE2_IMAGE,
      },
      {
        id: 4,
        text: "Green gardens become your private sanctuary",
        image: FEATURE2_IMAGE,
      },
      {
        id: 5,
        text: "We turn your vision into tangible reality",
        image: FEATURE2_IMAGE,
      },
      {
        id: 6,
        text: "With us, every corner tells a story",
        image: FEATURE2_IMAGE,
      },
    ],
    logos: [
      {
        text: "Implementation and Furnishing",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "Consulting and Supervision",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "Garden Design",
        image: "images/logos/تصميم-الحدائق.svg",
      },
      {
        text: "Exterior Design",
        image: "images/logos/التصميم-الخارجي.svg",
      },
      {
        text: "Interior Design",
        image: "images/logos/التصميم-الداخلي.svg",
      },
    ],
    projects: [
      {
        id: 1,
        text: "furniture",
        image: FEATURE2_IMAGE,
        link: "/projects/furniture",
      },
      {
        id: 2,
        text: "hospitality",
        image: FEATURE2_IMAGE,
        link: "/projects/hospitality",
      },
      {
        id: 3,
        text: "residential",
        image: FEATURE2_IMAGE,
        link: "/projects/residential",
      },
      {
        id: 4,
        text: "Landscape",
        image: FEATURE2_IMAGE,
        link: "/projects/landscape",
      },
      {
        id: 5,
        text: "commercial",
        image: FEATURE2_IMAGE,
        link: "/projects/commercial",
      },
      {
        id: 6,
        text: "Administrative offices",
        image: FEATURE2_IMAGE,
        link: "/projects/administrative-offices",
      },
    ],
  },
};

const HeroSection = () => {
  const { language } = useLanguage();
  const { slides, logos } = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleProjectClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="w-full mt-20 rounded-3xl">
      {/* Custom Slider */}
      <div
        className="relative h-[600px] overflow-hidden rounded-3xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div
          className="h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <figure
              key={slide.id}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <img
                src={slide.image}
                alt={slide.text}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <figcaption className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">
                  {slide.text}
                </h1>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => goToSlide(index)}
              className={`w-8 h-8 p-0 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Logos Section - Separated from the slider */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <figure key={index} className="flex flex-col items-center">
              <img
                src={logo.image}
                alt={logo.text}
                className="object-contain"
              />
              <figcaption className="sr-only">{logo.text}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {translations[language].projects.map((project) => (
            <article
              key={project.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Link
                to={project.link}
                onClick={handleProjectClick}
                className="block"
              >
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-bold text-center px-4">
                    {project.text}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
