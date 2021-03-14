const express = require('express');
const {
  getUsers,
} = require('../controllers/user.controller');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(protect, getUsers)

module.exports = router;
