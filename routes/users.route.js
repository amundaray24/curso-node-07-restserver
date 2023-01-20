const { Router } = require('express');

const router = Router();

const {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');


router.get('/', listUsers);

router.post('/', createUser);

router.get('/:userId', getUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;