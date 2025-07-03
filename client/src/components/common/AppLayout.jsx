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
      className={`min-h-screen flex flex-col bg-homebg ${direction}`}
      dir={direction}
    >
      <Header />
      <main
        className={`flex-grow ${
          isAuthPage
            ? "flex items-center justify-center w-screen py-12 "
            : ""
        }`}
      >
        <div className={isAuthPage ? "w-screen" : "w-screen"}>{children}</div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default AppLayout;
