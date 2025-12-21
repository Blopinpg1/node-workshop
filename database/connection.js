const mongoose = require("mongoose");
async function dbConnect() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Database connected successfully");
}

// export default dbConnect;

module.exports = dbConnect;
