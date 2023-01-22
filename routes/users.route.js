const { Router } = require('express');
const {check} = require('express-validator');

const {
  itsValidRole,
  validateUserByEmail,
  validateUserById
} = require('../helpers/database.validator.helper');

const {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const { validateJwt, roleValidator, validateFields } = require('../middleware');

const router = Router();

router.get('/', [
  validateJwt
],
listUsers);

router.post('/',[
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('firstName','firstName - Invalid Mandatory Parameter, must be send and have at least 3 chars').notEmpty().isLength({min:3}),
  check('secondName','secondName - Invalid Parameter, must be have at least 3 chars').optional().isLength({min:3}),
  check('lastName','lastName - Invalid Mandatory Parameter, must be send and have at least 3 chars').notEmpty().isLength({min:3}),
  check('secondLastName','secondLastName - Invalid Parameter, must be have at least 3 chars').optional().isLength({min:3}),
  check("password","password - Invalid Mandatory Parameter, must be have at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  check('email','email - Invalid Mandatory Parameter').isEmail(),
  check('email').custom(validateUserByEmail),
  // check('role','Invalid role').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(itsValidRole),
  validateFields
],
createUser);

router.get('/:userId',[
  validateJwt,
  check('userId','user-id - Invalid Mandatory Parameter').isMongoId(),
  check('userId').custom(validateUserById),
  validateFields
],
getUser);

router.patch('/:userId',[ 
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('userId','user-id - Invalid Mandatory Parameter').isMongoId(),
  check('userId').custom(validateUserById),
  check('firstName','firstName - Invalid Parameter, must be send and have at least 3 chars').optional().isLength({min:3}),
  check('secondName','secondName - Invalid Parameter, must be have at least 3 chars').optional().isLength({min:3}),
  check('lastName','lastName - Invalid Parameter, must be send and have at least 3 chars').optional().isLength({min:3}),
  check('secondLastName','secondLastName - Invalid Parameter, must be have at least 3 chars').optional().isLength({min:3}),
  check('email','email - Invalid Parameter').optional().isEmail(),
  check('email').optional().custom(validateUserByEmail),
  check('role').optional().custom(itsValidRole),
  validateFields
],
updateUser);

router.delete('/:userId',[
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('userId','user-id - Invalid Mandatory Parameter').isMongoId(),
  check('userId').custom(validateUserById),
  validateFields
],
deleteUser);

module.exports = router;