// middleware/checkAdmin.js
const User = require('../models/User');

const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user's ID
        const user = await User.findById(userId);

        if (!user || user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. User is not an admin.'
            });
        }

        next();
    } catch (error) {
        next(error); // Passes the error to the error-handling middleware
    }
};

module.exports = checkAdmin;
