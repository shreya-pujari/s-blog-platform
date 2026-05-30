import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");

  const [blogs, setBlogs] = useState([]);

  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        "https://s-blog-platform.onrender.com/api/blogs/all"
      );

      setBlogs(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        const response = await axios.put(
          `https://s-blog-platform.onrender.com/api/blogs/update/${editId}`,
          {
            title,
            content,
          }
        );

        setMessage(response.data.message);

        setEditId(null);

      } else {

        const response = await axios.post(
          "https://s-blog-platform.onrender.com/api/blogs/create",
          {
            title,
            content,
          }
        );

        setMessage(response.data.message);

      }

      setTitle("");
      setContent("");

      fetchBlogs();

    } catch (error) {

      setMessage(error.response.data.message);

    }
  };

  const handleDelete = async (id) => {

    try {

      const response = await axios.delete(
        `https://s-blog-platform.onrender.com/api/blogs/delete/${id}`
      );

      setMessage(response.data.message);

      fetchBlogs();

    } catch (error) {

      setMessage(error.response.data.message);

    }
  };

  const handleEdit = (blog) => {

    setTitle(blog.title);

    setContent(blog.content);

    setEditId(blog._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-6 text-center">
          {editId ? "Edit Blog" : "Create Blog"}
        </h1>

        {
          message && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
              {message}
            </p>
          )
        }

        <form
          onSubmit={handleCreateBlog}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Enter blog title"
            className="border p-3 rounded-lg outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your blog content..."
            rows="10"
            className="border p-3 rounded-lg outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            {editId ? "Update Blog" : "Publish Blog"}
          </button>

        </form>

      </div>

      <div className="max-w-5xl mx-auto mt-12">

        <h2 className="text-3xl font-bold mb-6">
          All Blogs
        </h2>

        <div className="grid gap-6">

          {
            blogs.map((blog) => (

              <div
                key={blog._id}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >

                <h3 className="text-2xl font-bold mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {blog.content}
                </p>

                <div className="flex gap-4">

                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

