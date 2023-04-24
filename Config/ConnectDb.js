const mongoose = require("mongoose");
// important to install then .env working
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Db connected and server is running on ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`${error}`);
  }
};

module.exports = connectDb;
