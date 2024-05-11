// authMiddleware.js

const extractUserInfoFromToken = (token) => {
    return { userId: '123', username: 'john.doe' };
};

const authenticateRequest = (req, res, next) => {
    // Extract the authentication token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    try {
        // Extract user information from the token
        const userInfo = extractUserInfoFromToken(token);

        if (!userInfo) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach user information to the request for further processing in the route or controller
        req.userInfo = userInfo;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error during authentication:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateRequest;
