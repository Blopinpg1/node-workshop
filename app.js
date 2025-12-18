// console.log("dfd");
// console.log("dslfjjsdlkfjslkdf");

// import express from "express";
// import env from "dotenv";

const express = require("express");
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

app.listen(3000, () => {
  console.log("Server running on port:" + 3000);
});
