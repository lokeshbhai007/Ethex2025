const mongoose = require("mongoose");

const getConnection = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((connection) => {
        console.log("database is connected");
      })
      .catch((error) => {
        console.log("faild to connect to db");
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getConnection;