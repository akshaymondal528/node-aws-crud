// Local imports
const { CONST_CREDENTIALS } = require('../config/env');

const apiRoutePrefix = CONST_CREDENTIALS.API_ROUTE_PREFIX;

/**
 * @function apiRoutes
 * @description function to define api routes
 * @author Akshay
 */
exports.apiRoutes = app => {
  app.use(apiRoutePrefix, require('./auth'));
  app.use(apiRoutePrefix, require('./user'));
};
