const path = require("path");
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const cors = require("cors");

// express app
const app = express();

// ROUTES //

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express.static(__dirname, { dotfiles: "allow" }));

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log("HTTP Server running on port 80");
});

// handle server side routing
app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../public/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});
