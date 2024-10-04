const validator = require("validator");

const validateSignUpData = (req) => {
   const {firstName, lastName, emailId, password } = req.body;
   if(!firstName || !lastName) {
     throw new Error("Name is not valid");
   } else if (!validator.isEmail(emailId)){
    throw new Error("Email is not Valid"); 
   } else if (!validator.isStrongPassword(password)){
    throw new Error("Please enter a strong Password!");
   }
};

const validateEditProfileData = (req) => {
  const allowedEditFileds = [
    "firstName", 
    "lastName", 
    "emailId",
    "age", 
    "gender", 
    "photoUrl",
    "about", 
    "skills"
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFileds.includes(field)
 ); 
 return isEditAllowed;
};

const forgotPassword = (req) => {
  const allowedForgotPassword = [
    "password"
  ];
  const isForgotPasswordAllowed = Object.keys(req.body).every((field) => 
    allowedForgotPassword.includes(field)
);
return isForgotPasswordAllowed; 
}


module.exports = {
    validateSignUpData,
    validateEditProfileData,
    forgotPassword,
};