const express = require('express');
const {
  getUsers,
  getAllUsers
} = require('../controllers/user.controller');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(protect, getUsers)

router.route('/all-users')
  .get(protect, getAllUsers)

module.exports = router;
