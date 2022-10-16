// Global imports
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    mobile: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

exports.User = mongoose.model('user', userSchema);
