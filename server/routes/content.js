// routes/content.js
const express = require('express');
const router = express.Router();
const { addContentOffering, editContentOffering ,
     getAllContentOfferings, deleteContentOffering
     } = require('../controllers/contentController');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkPublisher = require('../middleware/checkPublisher');

// Route to add a new content offering
router.route('/content')
    .post(isLoggedIn, checkPublisher, addContentOffering);

// Route to edit an existing content offering
router.route('/content/:id')
    .put(isLoggedIn, checkPublisher, editContentOffering);

// Route to get all content offerings
router.route('/content')
    .get( getAllContentOfferings);

// Route to delete a content offering
router.route('/content/:id')
    .delete(isLoggedIn, checkPublisher, deleteContentOffering);

module.exports = router;
