const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Siddharth:ogLsP5V2pNMfWcr7@namstenode.aczep.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

