const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const passport = require('passport');
const errorHandler = require('./middleware/errorHandler');
require('./config/passport'); 


//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

// cookie parser middleware and fileupload middleware
app.use(cookieParser());
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));


// import all routes here
const home = require('./routes/home');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const googleAuth = require('./routes/auth');
const orderRoutes = require('./routes/order');

// passport middleware
app.use(passport.initialize());

app.use('/', googleAuth);

// use routes here
app.use('/api/v1', home);
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);

app.use('/api/v1', contentRoutes);
app.use('/api/v1', orderRoutes);






// error handler middleware
app.use(errorHandler);

module.exports = app;
