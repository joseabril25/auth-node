const ErrorResponse = require("../utils/error.util");
const asyncHandler = require("../middlewares/async");
const UserData = require("../models/user-data.model");

// @desc    Get all users
// @route   GET /api/v1/users
// @access   Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const data = await UserData.getData();

  res.status(200).json({
    success: true,
    data
  });
});

// @desc    Get all users
// @route   GET /api/v1/all-users
// @access   Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await UserData.getAllUser();

  res.status(200).json({
    success: true,
    data
  });
});