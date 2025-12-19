// console.log("dfd");
// console.log("dslfjjsdlkfjslkdf");

// import express from "express";
// import env from "dotenv";

const express = require("express");
const dbConnect = require("./database/connection.js");
const User = require("./models/userModel.js");
const Blog = require("./models/blog.js");

// env.config();
dbConnect();
const app = express();

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

app.listen(3000, () => {
  console.log("Server running on port:" + 3000);
});

//  mongodb+srv://nodejsworkshop:<db_password>@cluster0.9dvqmkv.mongodb.net/?appName=Cluster0
