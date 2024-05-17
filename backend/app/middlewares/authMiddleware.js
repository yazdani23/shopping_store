const jwt = require("jsonwebtoken");

// middleware for authenticate user witch has valid token or not
const authMiddleWare = (req, res, next) => {
    const token = req.header("token")
    // if user request has not token in header send error
    if (!token) return res.status(401).json({message: "Auth Error"});
    try {
        const secretKey = process.env.SECRET_KEY || "Amir#$!@78SDSklqp+";
        // check token is valid or not
        const decoded = jwt.verify(token, secretKey); // da bekommt token und gibt uns payload zurück(mit verify die token wird entschlüsselt)
        // if valid inject token data into request (req.user)
        req.user = decoded.user; // weil in payload user existiert, da auch decoded auf user passiert
        next();
    } catch (e) {
        // if token is not valid send 401 error (access denied)
        console.error(e);
        res.status(401).send({error: true, message: "Invalid Token"});
    } 
}

// middleware for optional authentication and get user data from its token
const optionalAuthMiddleWare = (req, res, next) => {
    const token = req.header("token")
    try {
        const secretKey = process.env.SECRET_KEY || "Amir#$!@78SDSklqp+";
        // decode token
        const decoded = jwt.verify(token, secretKey);
        // inject token data into request of user (req.user)
        req.user = decoded.user;
        // go to controller
        next();
    } catch (e) {
        // if token is not valid go to controller
        next();
    }
}

module.exports = authMiddleWare
module.exports.optionalAuthMiddleware = optionalAuthMiddleWare;
