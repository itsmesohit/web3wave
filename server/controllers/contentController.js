
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const ContentOffering = require('../models/ContentOffering');
const User = require('../models/User');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set filename to be unique
  }
});

// Set up multer upload middleware
const upload = multer({ storage: storage });


exports.addContentOffering = async (req, res, next) => {
    try {
      // Check if files exist in request
      if (!req.files || !req.files.imageToDisplay || !req.files.caseStudyDocLink) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required files'
        });
      }
  
      // Upload files to Cloudinary
      console.log(req.files);
      const imageResult = await cloudinary.uploader.upload(req.files.imageToDisplay.tempFilePath);
      const caseStudyDocResult = await cloudinary.uploader.upload(req.files.caseStudyDocLink.tempFilePath);
  
      // Create new content offering
      const newContentOffering = new ContentOffering({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageToDisplay: imageResult.secure_url,
        region: req.body.region,
        pressReleaseLink: req.body.pressReleaseLink,
        category: req.body.category,
        gambling: req.body.gambling,
        web3_0: req.body.web3_0,
        adult: req.body.adult,
        gaming: req.body.gaming,
        publisherWebsiteName: req.body.publisherWebsiteName,
        publisherWebsiteLink: req.body.publisherWebsiteLink,
        publisherCompanyLogoLink: req.body.publisherCompanyLogoLink,
        caseStudyDocLink: caseStudyDocResult.secure_url,
        emailToContact: req.body.emailToContact,
        telegramLink: req.body.telegramLink,
        features: req.body.features,
        languages: req.body.languages,
        listedBy: req.user.id, 
        listedDate: Date.now(),
      });
  
      // Save content offering to database
      const savedOffering = await newContentOffering.save();
  
      // Add the offering to the user's offerings
      const user = await User.findById(req.user.id);
      user.offerings.push(savedOffering._id);
      await user.save();
  
      // Cleanup: Delete uploaded files from server
      fs.unlinkSync(req.files.imageToDisplay.tempFilePath);
      fs.unlinkSync(req.files.caseStudyDocLink.tempFilePath);
    //   res.redirect('http://localhost:3000');
      res.status(201).json({
        success: true,
        message: 'Content offering added successfully',
        data: savedOffering
      });
    } catch (error) {
      next(error);
    }
};

exports.editContentOffering = async (req, res, next) => {
    try {
        const contentId = req.params.id;
        const userId = req.user.id; 

        // Find the content offering by ID
        const contentOffering = await ContentOffering.findById(contentId);

        if (!contentOffering) {
            return res.status(404).json({
                success: false,
                message: 'Content offering not found'
            });
        }

        // Check if the logged-in user is the owner of the content offering
        if (contentOffering.listedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to edit this content offering'
            });
        }

        // Update the content offering with new data
        const updateFields = [
            'title', 'description', 'price', 'region', 
            'pressReleaseLink', 'category', 'gambling', 
            'web3_0', 'adult', 'gaming', 'publisherWebsiteName', 
            'publisherWebsiteLink', 'emailToContact', 'telegramLink', 
            'features', 'languages'
        ];

        updateFields.forEach(field => {
            if (req.body[field] !== undefined) {
                contentOffering[field] = req.body[field];
            }
        });

        // Handle file uploads to Cloudinary for caseStudyDocLink
        if (req.files && req.files.caseStudyDocLink) {
            const file = req.files.caseStudyDocLink;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "case_study_docs"
            });
            contentOffering.caseStudyDocLink = result.secure_url;
        }

        // Handle file uploads to Cloudinary for imageToDisplay
        if (req.files && req.files.imageToDisplay) {
            const file = req.files.imageToDisplay;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "images"
            });
            contentOffering.imageToDisplay = result.secure_url;
        }

        // Save updated content offering
        const updatedOffering = await contentOffering.save();

        res.status(200).json({
            success: true,
            message: 'Content offering updated successfully',
            data: updatedOffering
        });
    } catch (error) {
        next(error);
    }
};


exports.deleteContentOffering = async (req, res, next) => {
    try {
        const contentId = req.params.id;
        const userId = req.user.id; 

        // Find the content offering by ID
        const contentOffering = await ContentOffering.findById(contentId);

        if (!contentOffering) {
            return res.status(404).json({
                success: false,
                message: 'Content offering not found'
            });
        }

        // Check if the logged-in user is the owner of the content offering
        if (contentOffering.listedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this content offering'
            });
        }

        // Delete the content offering
        await contentOffering.remove();

        // Remove the offering from the user's offerings
        const user = await User.findById(userId);
        user.offerings = user.offerings.filter(offering => offering.toString() !== contentId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Content offering deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};


exports.getAllContentOfferings = async (req, res, next) => {
    try {
        const contentOfferings = await ContentOffering.find();

        res.status(200).json({
            success: true,
            data: contentOfferings
        });
    } catch (error) {
        next(error);
    }
};
