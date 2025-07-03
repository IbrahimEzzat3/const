import React from "react";
import Projects from "../../components/projects/Projects";
import { useLanguage } from "../../shared/context/LanguageContext";
import usePageTitle from "../../shared/hooks/usePageTitle";

const ProjectsPage = () => {
  const { t } = useLanguage();
  usePageTitle(t("projects") || "Our Projects");

  return (
    <div className="min-h-screen bg-white">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
