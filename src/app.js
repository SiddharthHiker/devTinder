const express = require("express");

const app = express()

app.use("/user", (req , res, next) => {
    console.log("Handling the route  user!!");
    next();
},
(req ,res, next) => {
    console.log("Handling the route  user 2!!");
    //res.send("2nd Response");
    next();
},
(req ,res, next) => {
    console.log("Handling the route  user 3!!");
    //res.send("2nd Response");
    next();
},
(req ,res, next) => {
    console.log("Handling the route  user 4!!");
    //res.send("2nd Response");
    next();
},
(req ,res,next) => {
    console.log("Handling the route  user 5!!");
    res.send("5nd Response");
},
);

app.listen(3000 , () => {
    console.log("Server is successfully listening on port 3000...");
});
