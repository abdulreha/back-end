const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Exit the app if DB connection fails
    }
};

module.exports = dbConnection;
