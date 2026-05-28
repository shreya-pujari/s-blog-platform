const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

router.post("/", protect, createBlog);

router.get("/", protect, getBlogs);

router.delete("/:id", protect, deleteBlog);

router.put("/:id", protect, updateBlog);

module.exports = router;