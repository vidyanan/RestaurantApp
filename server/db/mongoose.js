const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/API';

// connect to our database
mongoose.connect(mongoUrl, { useNewUrlParser: true });

module.exports = { mongoose }
