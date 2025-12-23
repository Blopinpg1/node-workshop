const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

//register
async function register(req, res) {
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
}

//login

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email: email }); //data is the object with user details
  console.log(data);
  if (!data) {
    res.json({
      message: "Not registered",
      status: 401,
    });
  } else {
    const isMatched = await bcrypt.compareSync(password, data.password); // hashed and compare the password hash and returns a boolean (true or false ) which is used to pass the message
    if (isMatched) {
      //json web token generate when login is successful

      const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        message: "login successful",
        token: token,
      });
    } else {
      res.json({
        message: "Invalid password",
      });
    }
  }
};

module.exports = { register, login };
