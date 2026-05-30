import { useState, useEffect } from "react";

import axios from "axios";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function CreateBlog() {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const blogData = location.state;

  useEffect(() => {

    if (blogData) {

      setTitle(blogData.title);

      setContent(blogData.content);
    }

  }, [blogData]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      if (blogData) {

        await axios.put(
          `https://s-blog-platform.onrender.com/api/blogs/${blogData._id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        await axios.post(
          "https://s-blog-platform.onrender.com/api/blogs",
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      navigate("/blogs");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">

            {blogData
              ? "Edit Blog"
              : "Create Blog"}

          </h1>

          <button
            onClick={() =>
              navigate("/blogs")
            }
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Back
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Enter blog title"
            className="border p-4 rounded-lg outline-none"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Write your blog..."
            rows="10"
            className="border p-4 rounded-lg outline-none resize-none"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {blogData
              ? "Update Blog"
              : "Publish Blog"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBlog;
