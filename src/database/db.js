// Global imports
const mongoose = require('mongoose');

// Local imports
const { DB_CREDENTIALS } = require('../config/env');

/**
 * @function connectDB
 * @description function to connect database
 * @author Akshay
 */
exports.connectDB = async () => {
  try {
    const uri = `${DB_CREDENTIALS.DB_URL}/${DB_CREDENTIALS.DB_NAME}`;
    const conn = await mongoose.connect(uri);
    console.log(`Database connected on ${conn.connection.host}`);
  } catch (error) {
    console.log('Database not connected!');
    console.log(error.message);
  }
};
