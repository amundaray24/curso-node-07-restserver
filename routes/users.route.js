const { Router } = require('express');
const {check} = require('express-validator');

const validateFields = require('../middleware/fields.validator.middleware');
const {
  itsValidRole,
  validateEmployeeByEmail
} = require('../helpers/database.validator.helper');

const {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');


const router = Router();
router.get('/', listUsers);

router.post('/', 
  check('firstName','Invalid firstName, must be send and have at least 3 chars').notEmpty().isLength({min:3}),
  check('secondName','Invalid secondName, must be have at least 3 chars').optional().isLength({min:3}),
  check('lastName','Invalid lastName, must be send and have at least 3 chars').notEmpty().isLength({min:3}),
  check('secondLastName','Invalid secondLastName, must be have at least 3 chars').optional().isLength({min:3}),
  check("password","Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  check('email','Invalid Email').isEmail(),
  check('email').custom(validateEmployeeByEmail),
  // check('role','Invalid role').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(itsValidRole),
  validateFields,
createUser);

router.get('/:userId', getUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;