import React from "react";
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

const HomePage = () => {
  usePageTitle("home");

  return (
    <>
      <Helmet>
        <title>Shad - Home</title>
        <meta
          name="description"
          content="Professional contracting and design services since 2003. Shad specializes in interior, exterior, and smart automation projects."
        />
        <meta
          name="keywords"
          content="Shad, contracting, interior design, exterior design, smart automation, Saudi Arabia"
        />
        <meta property="og:title" content="Shad - Home" />
        <meta
          property="og:description"
          content="Professional contracting and design services since 2003."
        />
        <meta property="og:image" content="images/logos/logo-shad.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WhyChooseUsSection />
          <FeaturedWorkSection />
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
