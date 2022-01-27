const express = require("express");
const app = express();
const cors = require("cors");

// middleware

app.use(express.json()) //req.body
app.use(cors())

// ROUTES //

// register and login routes

app.use("/auth", require("../routes/jwtAuth"));
app.use("/dashboard", require("../routes/dashboard"));

app.listen(5000, ()=> {
    console.log("server is running on port 5000");
})