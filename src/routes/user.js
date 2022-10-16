// Global imports
const router = require('express').Router();

// Local imports
const userController = require('../controllers/user');
const { upload } = require('../utils/s3');

router.post('/update-user', upload.single('image'), userController.updateUser);

module.exports = router;
