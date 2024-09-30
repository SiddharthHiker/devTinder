const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique : true,
        trim: true,
        validate(value) {
          if(!validator.isEmail(value)){
            throw new Error("Invalid email address:" + value);
          }
         },
    },
    password: {
        type: String,
        required: true,
        validator(value) {
            if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong Password:" + value);
        }
    },
},
    age: {
        type: Number,
        min: 18,
         
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fdummyimage.com%2F&psig=AOvVaw27V9R4qr9_fLGJiT2MAeMC&ust=1727719207632000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjLv7Te3eiIAxVjZmwGHdooCbIQjRx6BAgAEBg",
        validate(value) {
            if(!validator.isURL(value)){
              throw new Error("Invalid photo URL:" + value);
            }
           },
    },
    
    about: {
        type: String,
        maxLength: 255,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
