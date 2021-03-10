const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(protect, authorize('moderator', 'admin'), getUsers)
  .post(protect, authorize('admin'), createUser);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
