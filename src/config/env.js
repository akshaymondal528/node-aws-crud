// Global imports
let dotenv = require('dotenv');
dotenv.config();

// Database credentials
exports.DB_CREDENTIALS = {
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
};

// Constant credentials
exports.CONST_CREDENTIALS = {
  PORT: process.env.PORT,
  API_ROUTE_PREFIX: process.env.API_ROUTE_PREFIX,
  CRYPTO_KEY: process.env.CRYPTO_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
};
