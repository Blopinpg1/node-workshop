const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(
    "mongodb+srv://nodejsworkshop:hideandseeknodejs@cluster0.9dvqmkv.mongodb.net/?appName=Cluster0"
  );
  console.log("Database connected successfully");
}

// export default dbConnect;

module.exports = dbConnect;
