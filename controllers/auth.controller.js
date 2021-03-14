const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/error.util');
const asyncHandler = require('../middlewares/async');
const User = require("../models/user-registration.model");
const Login = require("../models/user-login.model");

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @acces   Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.register(req.body);
  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @acces   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password'), 400);
  }

  const user = await Login.login(req.body)

  sendTokenResponse(user, 200, res);
});

// @desc    Logout and clear token
// @route   GET /api/v1/auth/logout
// @acces   Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @acces   Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get token from model, create cookie and send response
// @route   HELPER FUNCTION ONLY
// @acces   Local Scope
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user
  });
};
