const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFEDATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "skills",
  "about",
];

userRouter.get("/user/requests/recived", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFEDATA);
    res.json({
      message: "Data Fetch Sucessfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFEDATA)
      .populate("toUserId", USER_SAFEDATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR :", err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = Math.max(1, parseInt(req.query.page) || 1); // Ensure the page is at least 1
    const limit = Math.min(parseInt(req.query.limit) || 10); // Limit the maximum value to 50
    const skip = (page - 1) * limit;

    // Fetch all connection requests (sent and received) by the user
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ],
    }).select("fromUserId toUserId");

    // Build a set of user IDs to hide from the feed
    const hideUsersFromFeed = new Set(
      connectionRequests.flatMap(req => [req.fromUserId.toString(), req.toUserId.toString()])
    );
    hideUsersFromFeed.add(loggedInUser._id.toString()); // Exclude the logged-in user

    // Query users excluding the hidden ones
    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) }
    })
      .select(USER_SAFEDATA)
      .skip(skip)
      .limit(limit);

    res.json({data: users});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
