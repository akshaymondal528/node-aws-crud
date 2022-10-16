// Global imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Local imports
const { CONST_CREDENTIALS } = require('./src/config/env');
const { connectDB } = require('./src/database/db');
const { apiRoutes } = require('./src/routes');
const { errorResponse } = require('./src/helpers/response');
const { ERROR } = require('./src/helpers/constant');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// API routes
apiRoutes(app);
app.use('*', (req, res) => {
  errorResponse(
    res,
    ERROR.PAGE_NOT_FOUND.statuscode,
    ERROR.PAGE_NOT_FOUND.success,
    ERROR.PAGE_NOT_FOUND.message
  );
});

// Server listen
const port = CONST_CREDENTIALS.PORT;
app.listen(port, () => {
  console.log(`Server up and run on port ${port}`);
  connectDB();
});
