const express = require("express");

const app = express()


app.get("/user", (req , res) => {
    res.send({firstName: "Siddharth", lastName: "Anand"});
});

app.post("/user", (req, res) => {
    res.send("Data SuccessFully save to the DataBase");
});

app.delete("/user",(req, res) => {
    res.send("Data Deleted successfully ");
});

app.use("/Test",(req,res)=> {
    res.send("Hello from the server Test!");
});



app.listen(3000 , () => {
    console.log("Server is successfully listening on port 3000...");
});
