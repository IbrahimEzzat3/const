import React from "react";
import { useParams } from "react-router-dom";
import BlogsList from "../../components/blogs/BlogsList";
import usePageTitle from "../../shared/hooks/usePageTitle";
import { useLanguage } from "../../shared/context/LanguageContext";

const BlogsListPage = () => {
  const { category } = useParams();
  const { t } = useLanguage();
  usePageTitle(t("pageTitle.blogs"));

  const formattedCategory = category
    ? category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            {category
              ? t("blogsListPage.categoryTitle", {
                  category: formattedCategory,
                })
              : t("blogsListPage.latestBlogsTitle")}
          </h1>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            {category
              ? t("blogsListPage.categoryDescription", {
                  category: formattedCategory.toLowerCase(),
                })
              : t("blogsListPage.latestBlogsDescription")}
          </p>
        </div>
        <BlogsList category={category} />
      </div>
    </section>
  );
};

export default BlogsListPage;
