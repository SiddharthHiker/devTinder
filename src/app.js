require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);
app.use(express.json());
app.use(cookieParser());


// Router
const authrouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter    = require("./routes/user");

// Use the Router
app.use('/',authrouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter); 

connectDB()
  .then(() => {
    console.log("Database connection established..");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is successfully listening on port ${port}..`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
