// Global imports
const router = require('express').Router();

// Local imports
const authController = require('../controllers/auth');
const { upload } = require('../utils/s3');

router.post(
  '/register-user',
  upload.single('image'),
  authController.userSignup
);
router.post('/user-login', authController.userLogin);

module.exports = router;
