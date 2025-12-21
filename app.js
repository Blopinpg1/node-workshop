const express = require("express");
const dbConnect = require("./database/connection.js");
const User = require("./models/userModel.js");
const Blog = require("./models/blog.js");

require("dotenv").config(); //.config() le .env file ma vako data load garxa process.env ma
dbConnect(); //database connect garne function call

const app = express();
const bcrypt = require("bcrypt");

app.use(express.json()); //body parser middleware to parse json data in request body

app.get("/", (req, res) => {
  res.json({
    name: "homepage",
    route: "root",
  });
});

app.get("/about", (req, res) => {
  res.json({
    address: "about page address",
    age: "1032",
    name: "lkdsffdsj",
  });
});

app.get("/fetch-users", async (req, res) => {
  //response ma User table ma vako user data sent grnu paryo
  const data = await User.find();
  res.json({
    userData: data,
  });
});

app.get("/fetch-blogs", async (req, res) => {
  const blogData = await Blog.find();
  res.json({
    blogData: blogData,
  });
});

app.post("/register", async function (req, res) {
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  const { name, email, password } = req.body;
  // console.log(name, email, password);

  await User.create({
    name, // if key value same then we can just say name
    email: email,
    password: bcrypt.hashSync(password, 10),
  });
  res.json({
    message: "User registered successfully",
  });
});

app.post("/create-blog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.json({
    message: "Blog created successfully",
  });
});

app.delete("/delete-blog/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);

  res.json({
    message: "blog deleted successfully",
  });
});

app.delete("/delete-blog", async (req, res) => {
  const { id } = req.body;
  await Blog.findByIdAndDelete(id);
  res.json({
    message: "Blog deleted successfully",
  });
});
app.get("/fetch-blogs/:id", async (req, res) => {
  const id = req.params.id;
  const blogData = await Blog.findById(id).select(["subtitle"]);
  res.json({
    data: blogData,
  });
});

app.patch("/update-blogs/:id", async (req, res) => {
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
});

app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  console.log(req.params.id);

  res.json({
    message: "User deleted successfully",
  });
});

app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id);
  res.json({
    message: "User deleted",
  });
});

app.get("/fetch-users/:id", async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).select(["-password", "-__v"]);
  res.json({
    data: data,
  });
});

app.patch("/update-user/:id", async (req, res) => {
  const id = req.params.id;
  // const name = req.body.name;
  const { name, email, password } = req.body;
  await User.findByIdAndUpdate(id, {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  res.json({
    message: "user updated successfully",
  });
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email: email }); //data is the object with user details
  console.log(data);
  if (!data) {
    res.json({
      message: "Not registered",
    });
  } else {
    const isMatched = bcrypt.compareSync(password, data.password); // hashed and compare the password hash and returns a boolean (true or false ) which is used to pass the message
    if (isMatched) {
      res.json({
        message: "login successful",
      });
    } else {
      res.json({
        message: "Invalid password",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server running on port:" + 3000);
});
