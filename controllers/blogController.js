const Blog = require("../models/blog.js");

exports.createBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.json({
    message: "Blog created successfully",
  });
};

exports.fetchBlogs = async (req, res) => {
  const blogData = await Blog.find();
  res.json({
    blogData: blogData,
  });
};

exports.deleteBlogById = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);

  res.json({
    message: "blog deleted successfully",
  });
};

exports.fetchBlogById = async (req, res) => {
  const id = req.params.id;
  const blogData = await Blog.findById(id).select(["subtitle"]);
  res.json({
    data: blogData,
  });
};

exports.updateBlogById = async (req, res) => {
  const id = req.params.id;
  const { name, subtitle, description } = req.body;
  await Blog.findByIdAndUpdate(id, {
    name,
    subtitle,
    description,
  });
  res.json({
    message: "blog updated successfully",
  });
};

// app.delete("/delete-blog", async (req, res) => {
//   const { id } = req.body;
//   await Blog.findByIdAndDelete(id);
//   res.json({
//     message: "Blog deleted successfully",
//   });
// });
