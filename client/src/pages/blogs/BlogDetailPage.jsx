import React from "react";
import BlogDetail from "../../components/blogs/BlogDetail";
import usePageTitle from "../../shared/hooks/usePageTitle";
const BlogDetailPage = () => {
  usePageTitle("blogs");
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogDetail />
    </div>
  );
};

export default BlogDetailPage;
