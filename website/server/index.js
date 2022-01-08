const path = require("path");
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");

// express app
const app = express();

try {

    // add middlewares
    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));
    app.use(express.static(__dirname, { dotfiles: "allow" }));

    // Starting both http & https servers
    const httpServer = http.createServer(app);

    httpServer.listen(80, () => {
        console.log("HTTP Server running on port 80");
    });
    
} catch {
    console.log("Launching development server");
    // add middlewares
    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));

    // start express server on port 5000
    app.listen(5000, () => {
        console.log("server started on port 5000");
    });
}
