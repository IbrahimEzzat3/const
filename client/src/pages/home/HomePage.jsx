import React, { useEffect, useState } from "react";
import HeroSection from "../../components/sections/HeroSection";
import AboutSection from "../../components/sections/AboutSection";
import FeaturedBlogsSection from "../../components/sections/FeaturedBlogsSection";
import ServicesSection from "../../components/sections/ServicesSection";
import WhyChooseUsSection from "../../components/sections/WhyChooseUsSection";
import FeaturedWorkSection from "../../components/sections/FeaturedWorkSection";
import SmartHomePackagesSection from "../../components/sections/SmartHomePackagesSection";
import VRDemoSection from "../../components/sections/VRDemoSection";
import TestimonialsSection from "../../components/sections/TestimonialsSection";
import CallToActionSection from "../../components/sections/CallToActionSection";
import ContactSection from "../../components/sections/ContactSection";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { sliderService } from "../../shared/services/sliderService";
import { useLanguage } from "../../shared/context/LanguageContext";

const HomePage = () => {
  usePageTitle("home");
  const { language } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoadingSlides(true);
    sliderService
      .getSliders(language)
      .then((res) => {
        if (isMounted) setSlides(res.data || []);
      })
      .catch(() => {
        if (isMounted) setSlides([]);
      })
      .finally(() => {
        if (isMounted) setLoadingSlides(false);
      });
    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <>
      <Helmet>
        <title>Ecosus- Home</title>
        <meta
          name="description"
          content="Professional contracting and design services since 2003. Ecosusspecializes in interior, exterior, and smart automation projects."
        />
        <meta
          name="keywords"
          content="Shad, contracting, interior design, exterior design, smart automation, Saudi Arabia"
        />
        <meta property="og:title" content="Ecosus- Home" />
        <meta
          property="og:description"
          content="Professional contracting and design services since 2003."
        />
        <meta property="og:image" content="images/logos/logo.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-homebg w-screen">
        <main className="w-screen">
          <HeroSection slides={slides} loadingSlides={loadingSlides} />
          <ServicesSection />
          <FeaturedWorkSection />
          <AboutSection />
          <WhyChooseUsSection />
          <SmartHomePackagesSection />
          <VRDemoSection />
          <FeaturedBlogsSection />
          <TestimonialsSection />
          <CallToActionSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default React.memo(HomePage);
