import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Blogs() {

  const [blogs, setBlogs] = useState([]);

  const [selectedBlog, setSelectedBlog] =
    useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const decodedToken = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const currentUserId = decodedToken?.id;

  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        "https://s-blog-platform.onrender.com/api/blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://s-blog-platform.onrender.com/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBlogs();

    } catch (error) {

      console.log(error);

    }
  };

  const handleEdit = (blog) => {

    navigate("/create", {
      state: blog,
    });
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Blogs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {blogs.map((blog) => (

          <div
            key={blog._id}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition"
          >

            <div>

              <h2 className="text-2xl font-bold mb-4 break-words">
                {blog.title}
              </h2>

              <p className="text-gray-700 break-words">
                {blog.content.slice(0, 180)}

                {blog.content.length > 180 && "..."}
              </p>

              {blog.content.length > 180 && (

                <button
                  onClick={() =>
                    setSelectedBlog(blog)
                  }
                  className="mt-3 text-blue-500 font-semibold hover:underline"
                >
                  Read More
                </button>

              )}

            </div>

            <div className="mt-6">

              <p className="text-sm text-gray-500 mb-4">
                Author: {blog.author?.name}
              </p>

              {blog.author?._id === currentUserId && (

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(blog)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(blog._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

      {selectedBlog && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl border border-gray-200">

            <button
              onClick={() =>
                setSelectedBlog(null)
              }
              className="absolute top-4 right-5 text-3xl font-bold text-gray-400 hover:text-black transition"
            >
              ×
            </button>

            <h2 className="text-4xl font-bold mb-6 break-words">
              {selectedBlog.title}
            </h2>

            <p className="text-gray-700 whitespace-pre-wrap break-words leading-8 text-lg">
              {selectedBlog.content}
            </p>

            <p className="mt-8 text-sm text-gray-500">
              Author: {selectedBlog.author?.name}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Blogs;
