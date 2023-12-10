// A custom middleware takes an auth-token from the request header of the endpoints in which user login is required and  verifies it through jwt lib.'s verification method .verify() and then if the token is verified successfully then saves the user inside request object tooked from the jwt_data (payload) extracted from the auth-token through verfication method and then hand overs the request to the next request handler callback function by calling next(). 

const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(403).json({ error: "Access denied due to missing authToken" });
    }
    try {
        const JWT_Data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = JWT_Data.user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ error: "Access denied due to unauthorized token" });
    }
}

module.exports = fetchUser;