/**
 * Uses Regex to identify whether the inputted email is correct or not. To be used as a
 * middleware
 * 
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next As this is a middleware function, moves onto function actually called
 * @returns User email if email is Valid or errors if email is not valid
 */
module.exports = (req, res, next) => {
    const { email, fname, lname, password } = req.body;

    function validEmail( userEmail )
    {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if(req.path === "/register")
    {
        if(![email, fname, lname, password].every(Boolean)){
            return res.status(403).json("Missing Credentials");
        } else if (!validEmail(email)){
            return res.json("Invalid Email");
        }
    } else if ( req.path === "/login") {
        if(![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if( !validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
};