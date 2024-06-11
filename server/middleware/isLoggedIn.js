const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        // If the request is from an API endpoint, send a 401 Unauthorized response
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        } else {
            // If the request is from a non-API route, redirect to the login page
            return res.redirect('/api/v1/login');
        }
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // if token has been exprired then clear from cookie
        if (decoded.exp < Date.now().valueOf() / 1000) {
            console.log('Token has expired');
            res.cookie('token', '', { maxAge: 1 });
            return res.redirect('/api/v1/login');
        }
        req.user = decoded; // Attach decoded user information to the request object
        
        next();
    } catch (error) {
        console.error('Error:', error);
        res.cookie('token', '', { maxAge: 1 });
        return res.redirect('/api/v1/login');
    }
};

module.exports = isLoggedIn;
