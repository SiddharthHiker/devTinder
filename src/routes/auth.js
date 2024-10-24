const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utlis/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// SignUp
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of the Data
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      skills,
      age,
      photoUrl,
      about,
      gender,
    } = req.body;

    // Encrypt  the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
      age,
      photoUrl,
      about,
      gender
    });

    const saveUser = await user.save();
    const token = await saveUser.getJWT();

      // Add the Token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

    res.json({message:"User Added Successfully!", data: saveUser });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials!!!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create  a JWT Token
      const token = await user.getJWT();

      // Add the Token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// LogOut
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("LogOut SucessFully");
});

module.exports = authRouter;
