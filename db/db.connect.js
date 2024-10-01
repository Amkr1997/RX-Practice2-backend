require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const initializeDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const connect = await mongoose.connect(mongoURI);

    if (connect) {
      console.log("connected to mongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initializeDatabase };
