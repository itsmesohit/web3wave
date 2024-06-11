const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log("Connection failed");
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
