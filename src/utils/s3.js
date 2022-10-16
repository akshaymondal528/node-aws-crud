// Global imports
const path = require('path');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Local imports
const { CONST_CREDENTIALS } = require('../config/env');
const { errorResponseCatch } = require('../helpers/response');

aws.config.update({
  secretAccessKey: CONST_CREDENTIALS.AWS_SECRET_ACCESS_KEY,
  accessKeyId: CONST_CREDENTIALS.AWS_ACCESS_KEY,
  region: CONST_CREDENTIALS.AWS_REGION,
});

const s3 = new S3Client();

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: CONST_CREDENTIALS.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      let extname = path.extname(file.originalname);
      let filename = `profilepicture/${Date.now()}${extname}`;
      cb(null, filename);
    },
  }),
});

exports.deleteFile = async (res, filename) => {
  try {
    const params = {
      Bucket: CONST_CREDENTIALS.AWS_BUCKET_NAME,
      Key: filename,
    };
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.log(error);
  }
};
