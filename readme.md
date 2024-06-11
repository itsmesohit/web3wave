# Koinpr 
A Product of Todayq

## Description
TodayQ NFT Platform is a comprehensive web application built on the MERN (MongoDB, Express.js, React.js, Node.js) stack, aimed at providing a platform for publishers to publish their NFTs, coins, and packages. Users can browse and purchase these items, as well as subscribe to various services offered on the platform. The platform is designed to cater to the needs of the web3 community, gaming enthusiasts, and more.



## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Deployment](#deployment)
4. [Technologies Used](#technologies-used)
5. [Environment Variables](#environment-variables)
6. [Contributing](#contributing)
7. [License](#license)

## Installation
1. **Client Setup**
   - Navigate to the client directory: `cd client`
   - Run `npm install` to install dependencies
   - Visit on localhost:3000
   
2. **Server Setup**
   - Navigate to the server directory: `cd server`
   - Run `npm install` to install dependencies
   - Visit on localhost:4000/api/v1/ 


### Environment Variables
Make sure to create a `.env` file in the root directory of your server with the following variables:

DB_URL = [Your MongoDB connection string]

CLOUDINARY_NAME = [Your Cloudinary account name]
CLOUDINARY_API_KEY = [Your Cloudinary API key]
CLOUDINARY_API_SECRET = [Your Cloudinary API secret]

PORT = 4000
JWT_SECRET = [Your JWT secret key]
JWT_EXPIRE = [JWT expiration time]
COOKIE_TIME = [Cookie expiration time]

GOOGLE_CLIENT_ID = [Your Google OAuth2 client ID]
GOOGLE_CLIENT_SECRET = [Your Google OAuth2 client secret]