const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1]; // Extract the token part

    if (!token) {
        return res.status(403).json({ message: "Unauthorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save decoded user info
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
        return res.status(403).json({ message: "Unauthorized, token is invalid or expired" });
    }
};

module.exports = ensureAuthenticated;
