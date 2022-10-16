// Global imports
const CryptoJS = require('crypto-js');

// Local imports
const {
  successResponse,
  errorResponse,
  errorResponseCatch,
} = require('../helpers/response');
const { SUCCESS, ERROR } = require('../helpers/constant');
const { User } = require('../models/user');
const { CONST_CREDENTIALS } = require('../config/env');
const { deleteFile } = require('../utils/s3');

/**
 * @function userSignup
 * @description function to register/signup user
 * @method POST
 * @author Akshay
 */
exports.userSignup = async (req, res) => {
  try {
    if (!req.body.email) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.EMAIL_REQUIRED.statuscode,
        ERROR.EMAIL_REQUIRED.success,
        ERROR.EMAIL_REQUIRED.message
      );
    }

    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.EMAIL_ALREADY_EXIST.statuscode,
        ERROR.EMAIL_ALREADY_EXIST.success,
        ERROR.EMAIL_ALREADY_EXIST.message
      );
    }

    const checkMobile = await User.findOne({ mobile: req.body.mobile });
    if (checkMobile) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.MOBILE_ALREADY_EXIST.statuscode,
        ERROR.MOBILE_ALREADY_EXIST.success,
        ERROR.MOBILE_ALREADY_EXIST.message
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.CONFIRM_PASSWORD_NOT_MATCH.statuscode,
        ERROR.CONFIRM_PASSWORD_NOT_MATCH.success,
        ERROR.CONFIRM_PASSWORD_NOT_MATCH.message
      );
    }

    const encryptPassword = CryptoJS.AES.encrypt(
      req.body.password,
      CONST_CREDENTIALS.CRYPTO_KEY
    );

    req.body.password = encryptPassword.toString();

    if (req.file) {
      req.body.image = req.file.key;
    }

    const addUser = await User.create(req.body);

    if (!addUser) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.USER_NOT_ADDED.statuscode,
        ERROR.USER_NOT_ADDED.success,
        ERROR.USER_NOT_ADDED.message
      );
    }

    return successResponse(
      res,
      SUCCESS.USER_SIGNUP.statuscode,
      SUCCESS.USER_SIGNUP.success,
      SUCCESS.USER_SIGNUP.message,
      (SUCCESS.USER_SIGNUP.result = { _id: addUser._id })
    );
  } catch (error) {
    return errorResponseCatch(res, error.message);
  }
};

/**
 * @function userLogin
 * @description function to login user
 * @method POST
 * @author Akshay
 */
exports.userLogin = async (req, res) => {
  try {
    let getUser = await User.findOne({ email: req.body.email });
    if (!getUser)
      return errorResponse(
        res,
        ERROR.INVALID_EMAIL.statuscode,
        ERROR.INVALID_EMAIL.success,
        ERROR.INVALID_EMAIL.message
      );

    let password = CryptoJS.AES.decrypt(
      getUser.password,
      CONST_CREDENTIALS.CRYPTO_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password !== password)
      return errorResponse(
        res,
        ERROR.INVALID_CREDENTIALS.statuscode,
        ERROR.INVALID_CREDENTIALS.success,
        ERROR.INVALID_CREDENTIALS.message
      );

    return successResponse(
      res,
      SUCCESS.USER_LOGIN.statuscode,
      SUCCESS.USER_LOGIN.success,
      SUCCESS.USER_LOGIN.message,
      (SUCCESS.USER_LOGIN.result = { _id: getUser._id })
    );
  } catch (error) {
    return errorResponseCatch(res, error.message);
  }
};
