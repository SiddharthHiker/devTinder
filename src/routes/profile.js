const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData, forgotPassword} = require("../utlis/validation")
const bcrypt = require("bcrypt");


// Profile/View
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try{
    if(!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
   const loggedInUser = req.user;

   Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
   await loggedInUser.save();

   res.json({
    message: `${loggedInUser.firstName}, your profile updated sucessfully`,
    data: loggedInUser,
   });
  } catch (err) {
   res.status(400).send("ERROR : " + err.message);
  }
});
  
// forgotPassword
profileRouter.patch("/forgotPassword", userAuth, async (req, res) => {
  try{
  if(!forgotPassword(req)) {
    throw new Error("Invalid forgotPassword Request");
  }

   const loggedInUser = req.user;

   // Retrive the password from req.body  
   const { password } = req.body;

   // Check if password is provided in the request body 
   if(!password) {
    throw new Error("Password is required");
   }
   // Encrypt the password
   const passwordHash = await bcrypt.hash(password, 10);

   // Updated the user's password
   loggedInUser.password = passwordHash;

   Object.keys(req.body).forEach((key) => {
    if (key !== 'password') {
      loggedInUser[key] = req.body[key];
    }
  });
   await loggedInUser.save();
   res.json({
    message: `${loggedInUser.firstName}, your password chnaged Succesfully`,
    data: loggedInUser,
   });
  } catch (err) {
   res.status(400).send("ERROR : " + err.message);
  }
});



module.exports = profileRouter;
