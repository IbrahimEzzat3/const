import React from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";

const EditBlogPage = () => {
  const { blogId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">Edit Blog</h1>
        <p className="mt-2 text-accent-teal">Update the blog post details below</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <BlogForm isEdit={true} blogId={blogId} />
      </div>
    </div>
  );
};

export default EditBlogPage;
