const Blog = require("../models/Blog");

const createBlog = async (req, res) => {

  try {

    const { title, content } = req.body;

    const blog = await Blog.create({

      title,

      content,

      author: req.user.id,
    });

    res.status(201).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      blog.author.toString() !== req.user.id
    ) {

      return res.status(403).json({
        message:
          "You can delete only your own blogs",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      blog.author.toString() !== req.user.id
    ) {

      return res.status(403).json({
        message:
          "You can edit only your own blogs",
      });
    }

    blog.title = req.body.title || blog.title;

    blog.content =
      req.body.content || blog.content;

    await blog.save();

    res.status(200).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
};