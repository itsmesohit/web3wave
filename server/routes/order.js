// routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isLoggedIn = require('../middleware/isLoggedIn');

// Route to create a new order
router.post('/order', isLoggedIn, orderController.createOrder);

// Route to get all orders for the logged-in user
router.get('/order', isLoggedIn, orderController.getAllOrders);




module.exports = router;
