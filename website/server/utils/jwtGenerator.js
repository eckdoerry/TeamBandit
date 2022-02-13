const jwt = require("jsonwebtoken");
require('dotenv').config(); // get access to all .env variables

/**
 * Generates a new JWT Token based off of the given id.
 * 
 * NOTE: expiresIn signifies when this will expire, maybe look into changing it
 * 
 * @param {*} organizer_id Not really just Organizer ID, can also be student id etc,
 * just dont want to change it for fear of breaking
 * @returns Creates and returns a JWT token signifying valid user
 */
function jwtGenerator(organizer_id)
{
    const payload = {
        user: organizer_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator;