const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, mobileNo, region } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNo,
            region
        });

        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        next(error); // Passes the error to the error-handling middleware
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email:user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token);

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        next(error); // Passes the error to the error-handling middleware
    }
};

exports.logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('api/v1/login');
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log('User:', user);
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error); 
    }
};

exports.editUserProfile = async (req, res, next) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error); 
    }
};

exports.forgotPassword = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Please contact admin to reset your password'
    });
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    } catch (error) {
        next(error); 
    }
};

exports.addToCart = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const offeringId = req.params.offeringId;

      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the offering already exists in the cart
      if (user.itemsInCart.includes(offeringId)) {
        return res.status(400).json({
          success: false,
          message: 'Offering already in cart'
        });
      }
  
      // Add the offering to the user's cart
      user.itemsInCart.push(offeringId);
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Offering added to cart successfully',
        data: user.itemsInCart
      });
    } catch (error) {
      next(error);
    }
};

exports.addToBookmarks = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const offeringId = req.params.offeringId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the offering already exists in the bookmarks
      if (user.bookmarks.includes(offeringId)) {
        return res.status(400).json({
          success: false,
          message: 'Offering already in bookmarks'
        });
      }
  
      // Add the offering to the user's bookmarks
      user.bookmarks.push(offeringId);
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Offering added to bookmarks successfully',
        data: user.bookmarks
      });
    } catch (error) {
      next(error);
    }
  };

exports.getBookmarks = async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('bookmarks');
  
      res.status(200).json({
        success: true,
        data: user.bookmarks
      });
    } catch (error) {
      next(error);
    }
  }

exports.getCarts = async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('itemsInCart');
  
      res.status(200).json({
        success: true,
        data: user.itemsInCart
      });
    } catch (error) {
      next(error);
    }
  }

exports.removeFromCart = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const offeringId = req.params.offeringId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the offering exists in the cart
      if (!user.itemsInCart.includes(offeringId)) {
        return res.status(400).json({
          success: false,
          message: 'Offering not in cart'
        });
      }
  
      // Remove the offering from the user's cart
      user.itemsInCart = user.itemsInCart.filter(item => item.toString() !== offeringId);
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Offering removed from cart successfully',
        data: user.itemsInCart
      });
    } catch (error) {
      next(error);
    }
  }

exports.removeFromBookmarks = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const offeringId = req.params.offeringId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the offering exists in the bookmarks
      if (!user.bookmarks.includes(offeringId)) {
        return res.status(400).json({
          success: false,
          message: 'Offering not in bookmarks'
        });
      }
  
      // Remove the offering from the user's bookmarks
      user.bookmarks = user.bookmarks.filter(item => item.toString() !== offeringId);
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Offering removed from bookmarks successfully',
        data: user.bookmarks
      });
    } catch (error) {
      next(error);
    }
  }
