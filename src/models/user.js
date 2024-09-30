const mongoose = require('mongoose')

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
    },
    password: {
        type: String,
        required: true,
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
        default: "https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fdummyimage.com%2F&psig=AOvVaw27V9R4qr9_fLGJiT2MAeMC&ust=1727719207632000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjLv7Te3eiIAxVjZmwGHdooCbIQjRx6BAgAEBg"
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
