const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Retrieve the token from the request header
    const token = req.header('auth-token');
    console.log("token", token);
    
    // If no token is found, return a 401 Unauthorized response
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, 'secret_key');
        // Attach the verified user information to the request object
        req.user = verified;
        console.log("verified:", verified);
        next();
    } catch (error) {
        // If token verification fails, return a 400 Bad Request response
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
