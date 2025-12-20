// console.log("dfd");
// console.log("dslfjjsdlkfjslkdf");

// import express from "express";
// import env from "dotenv";

const express = require("express");
const dbConnect = require("./database/connection.js");
const User = require("./models/userModel.js");
const Blog = require("./models/blog.js");

// env.config();
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

app.get("/fetch-blog", async (req, res) => {
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

app.delete("/delete-blog/:id", async(req, res)=>{
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  

  res.json({
   message:"blog deleted successfully",
  })
})




app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  console.log(req.params.id);


  res.json({
    message: "User deleted successfully",
  });
});


app.delete("/delete", async(req,res)=>{
  const {id} = req.body;
  await User.findByIdAndDelete(id); 
  res.json({
    message : "User deleted",
  });

})



app.listen(3000, () => {
  console.log("Server running on port:" + 3000);
});

//  mongodb+srv://nodejsworkshop:<db_password>@cluster0.9dvqmkv.mongodb.net/?appName=Cluster0
