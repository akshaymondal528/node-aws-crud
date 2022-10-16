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
 * @function updateUser
 * @description function to update user
 * @method POST
 * @author Akshay
 */
exports.updateUser = async (req, res) => {
  try {
    let query = {};

    if (!req.query.userid && !req.params.userid) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.USER_NOT_FOUND.statuscode,
        ERROR.USER_NOT_FOUND.success,
        ERROR.USER_NOT_FOUND.message
      );
    }

    if (req.query.userid && req.query.userid !== '')
      query._id = req.query.userid;
    if (req.params.userid) query._id = req.params.userid;

    let getUser = await User.findOne(query);

    if (req.body.email) {
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
    }

    if (req.body.mobile) {
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
    }

    if (req.body.password) {
      const encryptPassword = CryptoJS.AES.encrypt(
        req.body.password,
        CONST_CREDENTIALS.CRYPTO_KEY
      );

      req.body.password = encryptPassword.toString();
    }

    if (req.file) {
      if (getUser) deleteFile(res, getUser.image);
      req.body.image = req.file.key;
    }

    const updateUser = await User.updateOne(query, req.body, { new: true });

    if (updateUser.acknowledged !== true) {
      if (req.file) deleteFile(res, req.file.key);
      return errorResponse(
        res,
        ERROR.USER_NOT_UPDATE.statuscode,
        ERROR.USER_NOT_UPDATE.success,
        ERROR.USER_NOT_UPDATE.message
      );
    }

    return successResponse(
      res,
      SUCCESS.USER_UPDATE.statuscode,
      SUCCESS.USER_UPDATE.success,
      SUCCESS.USER_UPDATE.message,
      (SUCCESS.USER_UPDATE.result = { _id: getUser._id })
    );
  } catch (error) {
    return errorResponseCatch(res, error.message);
  }
};
