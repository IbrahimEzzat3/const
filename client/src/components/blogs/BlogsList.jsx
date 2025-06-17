import React, { useState, useEffect } from "react";
import { blogService } from "../../shared/services/blogService";
import Blog from "./Blog";
import { useLanguage } from "../../shared/context/LanguageContext";

const BlogsList = ({ category, isPopular = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const { t } = useLanguage();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let data;
        if (isPopular) {
          data = await blogService.getPopularBlogs();
        } else if (selectedCategory) {
          data = await blogService.getBlogsByCategory(selectedCategory);
        } else {
          data = await blogService.getBlogs();
        }
        setBlogs(data.data);
      } catch (err) {
        setError(t("blogsList.loadError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [isPopular, selectedCategory, t]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-indigo-600 hover:text-indigo-500"
        >
          {t("common.tryAgain")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Select and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            dir={"ltr"}
          >
            <option value="">{t("blogsList.allBlogs")}</option>
            <option value="construction">
              {t("blogCategory.construction")}
            </option>
            <option value="architecture">
              {t("blogCategory.architecture")}
            </option>
            <option value="interior-design">
              {t("blogCategory.interiorDesign")}
            </option>
            <option value="renovation">{t("blogCategory.renovation")}</option>
            <option value="sustainability">
              {t("blogCategory.sustainability")}
            </option>
            <option value="industry-news">
              {t("blogCategory.industryNews")}
            </option>
          </select>
        </div>
      </div>

      {/* All Blogs / Category Blogs */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {isPopular
            ? t("blogsList.popularBlogs")
            : selectedCategory
            ? t("blogsList.categoryBlogs", { category: selectedCategory })
            : t("blogsList.allBlogsTitle")}
        </h2>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Blog key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t("blogsList.noBlogsFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
