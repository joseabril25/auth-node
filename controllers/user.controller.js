const ErrorResponse = require("../utils/error.util");
const asyncHandler = require("../middlewares/async");
const User = require("../models/user.model");

// @desc    Get all users
// @route   GET /api/v1/users
// @acces   Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Create new user
// @route   POST /api/v1/users
// @acces   Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PATCH /api/v1/users/:id
// @acces   Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  // If not current user, admin or moderator
  if (
    user.id !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "moderator"
  ) {
    return next(
      new ErrorResponse(`You have no permission to perform this action`, 401)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user password
// @route   PATCH /api/v1/auth/password/:id
// @acces   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @acces   Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  // If not current user or admin
  if (user.id !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You have no permission to perform this action`, 401)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
