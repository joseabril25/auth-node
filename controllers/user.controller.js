const ErrorResponse = require("../utils/error.util");
const asyncHandler = require("../middlewares/async");
const Register = require("../models/user-registration.model");

// @desc    Get all users
// @route   GET /api/v1/users
// @access   Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});