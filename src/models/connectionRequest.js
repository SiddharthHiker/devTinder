const mongoose = require('mongoose');

const connectionRequestSchema =  new mongoose.Schema({
    fromUserId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User", // Reference to the User collection
       required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values:["ignore","intrested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
}, {
    timestamps: true,
}
);
// Compound Index 
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

// PRE middleware
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if the fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Error send connection request to yourself!");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model
("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;