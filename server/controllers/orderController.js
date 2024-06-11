
const Order = require('../models/Order');
const User = require('../models/User');
const ContentOffering = require('../models/ContentOffering');

exports.createOrder = async (req, res, next) => {
    try {
        console.log('User creating order:', req.user);
        console.log('Request body:', req.body);
        
        const { contentIds } = req.body; // Expect an array of content IDs
        const userId = req.user.id;

        // Check if contentIds is provided and is an array
        if (!Array.isArray(contentIds) || contentIds.length === 0) {
            console.log('Content IDs validation failed');
            return res.status(400).json({
                success: false,
                message: 'Content IDs are required'
            });
        }

        // Fetch content offerings
        const contentOfferings = await ContentOffering.find({ '_id': { $in: contentIds } });
        if (contentOfferings.length !== contentIds.length) {
            console.log('Content offerings not found');
            return res.status(404).json({
                success: false,
                message: 'One or more content offerings not found'
            });
        }

        // Calculate total price
        const totalPrice = contentOfferings.reduce((total, offering) => total + offering.price, 0);
        console.log('Total price calculated:', totalPrice);

        // Create new order
        const newOrder = new Order({
            user: userId,
            items: contentIds,
            total: totalPrice,
            createdAt: Date.now()
        });

        // Save order to database
        const savedOrder = await newOrder.save();
        console.log('Order saved:', savedOrder);

        // Update user's order history and clear the cart
        const user = await User.findById(userId);
        user.orderHistory.push(savedOrder._id);
        user.itemsInCart = []; // Assuming you have itemsInCart in the User schema
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: savedOrder
        });
    } catch (error) {
        console.error('Error creating order in backend:', error);
        next(error);
    }
};


exports.getAllOrders = async (req, res, next) => {
    try {
        const userId = req.user.id; 

        // Find all orders for the current user and populate the items field
        const orders = await Order.find({ user: userId }).populate('items');

        // Format the response to include order details with content offering information
        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            items: order.items.map(item => ({
                id: item._id,
                title: item.title,
                price: item.price,
                category: item.category,
                views: item.views,
                region: item.region,
                kprRating: item.kprRating,
                imageToDisplay: item.imageToDisplay
            })),
            total: order.total,
            createdAt: order.createdAt
        }));

        res.status(200).json({
            success: true,
            data: formattedOrders
        });
    } catch (error) {
        next(error);
    }
};



