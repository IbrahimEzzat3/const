import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../shared/context/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const { direction } = useLanguage();
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col bg-secondary-50 ${direction}`}
      dir={direction}
    >
      <Header />
      <main
        className={`flex-grow ${
          isAuthPage
            ? "flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            : "container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        }`}
      >
        <div className={isAuthPage ? "w-full max-w-md" : "w-full"}>
          {children}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default AppLayout;
