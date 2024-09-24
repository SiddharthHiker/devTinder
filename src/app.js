const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // Logic of db call and get user data
    throw new Error("fsgsgjsj");
    res.send("User Data Sent");
  } catch {err}
  res.status(500).send("Some Error contact support team");
});

app.use("/", (err, req, res, next) => {
  if(err){
    res.status(500).send("Something went Rong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
