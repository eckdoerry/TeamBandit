// This needs to get hidden

// Pool information will need to change to our server DB,
// I think it should be localhost, user and password thats different
const Pool = require("pg").Pool;
require('dotenv').config(); // get access to all .env variables

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.port,
    database: process.env.database
});

module.exports = pool;