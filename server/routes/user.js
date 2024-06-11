// routes/user.js
const express = require('express');
const router = express.Router();
const { 
    registerUser, loginUser, logoutUser,
    getUserProfile, editUserProfile, 
    forgotPassword, resetPassword,
    addToCart, addToBookmarks,
    getBookmarks, getCarts , removeFromBookmarks
    , removeFromCart
 } = require('../controllers/userController');
const isLoggedIn = require('../middleware/isLoggedIn'); // Corrected the import for isLoggedIn
const checkAdmin = require('../middleware/checkAdmin');
const checkPublisher = require('../middleware/checkPublisher');

// Register user route
router.route('/register')
    .post(registerUser);

// Login user route
router.route('/login')
    .post(loginUser);

// Logout user route
router.route('/logout')
    .post(logoutUser);

// Get user profile route
router.route('/profile')
    .get(isLoggedIn, getUserProfile)
    .put(isLoggedIn, editUserProfile);

// Forgot password route
router.route('/forgotpassword')
    .post(forgotPassword);

// Reset password route
router.route('/resetpassword')
    .put(isLoggedIn, checkAdmin, resetPassword); // Only admin can reset password

// Protected route example
router.route('/dashboard')
    .get(isLoggedIn, (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to the dashboard'
        });
    });

    router.route('/cart/:offeringId')
  .post(isLoggedIn, addToCart);

// Route to add an offering to bookmarks
router.route('/bookmarks/:offeringId')
  .post(isLoggedIn, addToBookmarks);
module.exports = router;

router.route('/bookmarks')
    .get(isLoggedIn, getBookmarks);

router.route('/cart').
    get(isLoggedIn, getCarts);

router.route('/bookmarks/:offeringId')
    .delete(isLoggedIn, removeFromBookmarks);

router.route('/cart/:offeringId')
    .delete(isLoggedIn, removeFromCart);


