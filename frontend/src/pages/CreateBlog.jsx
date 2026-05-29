import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://s-blog-platform.onrender.com/api/blogs/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Blog</h2>

        <input
          type="text"
          name="title"
          placeholder="Enter Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Enter Blog Content"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Publish Blog</button>

        <Link to="/blogs">
          <button type="button">Back to Blogs</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateBlog;