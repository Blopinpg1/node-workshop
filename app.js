const express = require("express");
const dbConnect = require("./database/connection.js");

//.config() le .env file ma vako data load garxa process.env ma
require("dotenv").config();
dbConnect(); //database connect garne function call

const {
  root,
  about,
  deleteUser,
  updateUser,
  fetchUserById,
  fetchAllUsers,
} = require("./controllers/userController.js");
const { register, login } = require("./controllers/authController.js");
const {
  createBlog,
  fetchBlogs,
  // updateBlogById,
  fetchBlogById,
  // updateBlogById,
  deleteBlogById,
} = require("./controllers/blogController.js");

const app = express();
app.use(express.json()); //body parser middleware to parse json data in request body

//auth routes
app.post("/register", register);
app.post("/login", login);

//root and about routes
app.get("/", root);
app.get("/about", about);

//user routes
app.get("/fetch-users", fetchAllUsers);
app.delete("/delete-user/:id", deleteUser);
app.get("/fetch-users/:id", fetchUserById);
app.patch("/update-user/:id", updateUser);

//blog routes
app.get("/fetch-blogs", fetchBlogs);
app.post("/create-blog", createBlog);
app.delete("/delete-blog/:id", deleteBlogById);
app.get("/fetch-blogs/:id", fetchBlogById);
// app.patch("/update-blogs/:id", updateBlogById);

app.listen(3000, () => {
  console.log("Server running on port:" + 3000);
});
