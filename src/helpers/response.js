// Local imports
const { ERROR } = require('./constant');

/**
 * @function successResponse
 * @description function to send success response
 * @author Akshay Mondal
 */
exports.successResponse = (res, status, success, message, result = []) => {
  return res.status(status).json({
    success,
    message,
    result,
  });
};

/**
 * @function errorResponse
 * @description function to send error response
 * @author Akshay Mondal
 */
exports.errorResponse = (res, status, success, message, result = []) => {
  return res.status(status).json({
    success,
    message,
    result,
  });
};

/**
 * @function errorResponseUnauth
 * @description function to send error response for unauth
 * @author Akshay Mondal
 */
exports.errorResponseUnauth = (res, status, success, message) => {
  return res.status(status).json({
    success,
    message,
  });
};

/**
 * @function errorResponseCatchss
 * @description function to send error response for catch
 * @author Akshay Mondal
 */
exports.errorResponseCatch = (res, error) => {
  return res.status(ERROR.INTERNAL_SERVER_ERROR.statuscode).json({
    success: ERROR.INTERNAL_SERVER_ERROR.success,
    message: ERROR.INTERNAL_SERVER_ERROR.message,
    error,
  });
};
