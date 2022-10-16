// Status codes
const STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORISED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

// Success response
exports.SUCCESS = {
  USER_SIGNUP: {
    statuscode: STATUS_CODE.OK,
    success: true,
    message: 'User registration successfull!',
  },
  USER_LOGIN: {
    statuscode: STATUS_CODE.OK,
    success: true,
    message: 'User login successfull!',
  },
  USER_UPDATE: {
    statuscode: STATUS_CODE.OK,
    success: true,
    message: 'User update successfull!',
  },
};

// Error response
exports.ERROR = {
  PAGE_NOT_FOUND: {
    statuscode: STATUS_CODE.NOT_FOUND,
    success: false,
    message: 'Page not found!',
  },
  INTERNAL_SERVER_ERROR: {
    statuscode: STATUS_CODE.INTERNAL_SERVER_ERROR,
    success: false,
    message: 'Internal server error!',
  },
  EMAIL_REQUIRED: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Email required!',
  },
  EMAIL_ALREADY_EXIST: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Email already exist!',
  },
  MOBILE_ALREADY_EXIST: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Mobile already exist!',
  },
  CONFIRM_PASSWORD_NOT_MATCH: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Confirm password not matched!',
  },
  USER_NOT_ADDED: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'User not added!',
  },
  INVALID_EMAIL: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Invalid email!',
  },
  INVALID_CREDENTIALS: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'Invalid credentials!',
  },
  USER_NOT_FOUND: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'User not found!',
  },
  USER_NOT_UPDATE: {
    statuscode: STATUS_CODE.BAD_REQUEST,
    success: false,
    message: 'User not update!',
  },
};
