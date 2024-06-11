
const ContentOffering = require('../models/ContentOffering');

exports.home = async (req, res) => {
    try {

        // list all the content offerings
        const contentOfferings = await ContentOffering.find();

        res.status(200).json({
            success: true,
            data: contentOfferings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request.',
            error: error.message
        });
    }
};
