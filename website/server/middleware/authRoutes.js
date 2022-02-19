const express = require("express");
const app = express();
const cors = require("cors");

// Middleware

app.use(express.json())
app.use(cors())

// ROUTES //

// Register and Login Routes
app.use("/auth", require("../routes/jwtAuth"));

// Course Information Routes
app.use("/courses", require("../routes/TeamBanditPages/courseRoutes"));
app.use("/students", require("../routes/TeamBanditPages/studentRoutes"));
app.use("/projects", require("../routes/TeamBanditPages/projectRoutes"));
app.use("/mentors", require("../routes/TeamBanditPages/mentorRoutes"));
app.use("/clients", require("../routes/TeamBanditPages/clientRoutes"));
app.use("/teams", require("../routes/TeamBanditPages/teamRoutes"));
app.use("/emailhub", require("../routes/TeamBanditPages/emailRoutes"));

// General Routes
app.use("/general", require("../routes/TeamBanditPages/generalRoutes"));
app.use("/fileuploads", require("../routes/uploadRoutes"));

// END ROUTES //

app.listen(5000, ()=> {
    console.log("server is running on port 5000");
})