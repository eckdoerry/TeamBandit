const path = require("path");
// Pool information will need to change to our server DB,
// I think it should be localhost, user and password thats different

// REQUIRE .ENV FILE USING ABSOLUTE PATH
require('dotenv').config( {
    path: path.join(__dirname, '.env')
} );

const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.port,
    database: process.env.database
});

module.exports = pool;