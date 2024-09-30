const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utlis/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
  // Validation of the Data 
  validateSignUpData(req);
  const {firstName, lastName, emailId, password , skills , age, photoUrl, about } = req.body;
  // Encrypt  the password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  // Creating a new instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
    skills,
    age,
    photoUrl,
    about

  });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

app.post("/login", async(req, res) => {
  try {
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId:  emailId});
    if(!user) {
      throw new Error("Invalid credentials!!!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
      res.send("Login SucessFully!!!");
    } else {
      throw new Error("Invalid credentials!!!");
    }
  } catch (err) {
   res.status(400).send("ERROR : " + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Get User By Id
app.get("/getUserById", async (req, res) => {
  const UserId = req.body.id;
  try {
    const users = await User.findById(UserId).exec();
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Feed API - Get / feed - get all the data from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// deleted API
app.delete("/user", async (req, res) => {
  const UserId = req.body.id;
  console.log(UserId);
  try {
    // const user = await User.findByIdAndDelete({id : UserId});
    const user = await User.findByIdAndDelete(UserId);
    res.send("user Data Delete Sucesfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
// Update User
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);
  const data = req.body;

  try {
    const Allowed_updates = ["photoUrl", "about", "skills", "gender", "age"];
    // Check if all update keys are allowed
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return Allowed_updates.includes(k); // Include return statement
    });

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed"); // Properly capitalize "Error"
    }

    if (data?.skills.length > 10){
      throw new Error("Skills cannot be more than 10");
    }

    // Find the user and update
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after", // To return the updated user
      runValidators: true, // Ensures validations are run
    });

    console.log(user);
    res.send("User Data Updated Successfully"); // Fix typo "Sucesfully"
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
