import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "https://s-blog-platform.onrender.com/api/blogs/all"
      );

      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(
        `https://s-blog-platform.onrender.com/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="blogs-container">
      <div className="top-bar">
        <h1>Blogs</h1>

        <div className="buttons">
          <Link to="/create">
            <button>Create Blog</button>
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h2>{blog.title}</h2>

            <p>
              {blog.content.length > 150
                ? blog.content.substring(0, 150) + "..."
                : blog.content}
            </p>

            {blog.content.length > 150 && (
              <button onClick={() => setSelectedBlog(blog)}>
                Read More
              </button>
            )}

            <h4>Author: {blog.author?.name}</h4>

            {user && user.id === blog.author?._id && (
              <div className="blog-actions">
                <Link to={`/edit/${blog._id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => deleteBlog(blog._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedBlog.title}</h2>

            <p>{selectedBlog.content}</p>

            <button onClick={() => setSelectedBlog(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;