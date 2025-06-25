import React from "react";
import BlogForm from "../../components/admin/BlogForm";

const CreateBlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent-teal">Create New Blog</h1>
        <p className="mt-2 text-accent-teal">
          Fill in the details below to create a new blog post
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <BlogForm />
      </div>
    </div>
  );
};

export default CreateBlogPage;
