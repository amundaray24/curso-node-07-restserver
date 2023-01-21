const { Router } = require('express');
const {check} = require('express-validator');

const validateFields = require('../middleware/fields.validator.middleware');

const {
  validateUserByEmail
} = require('../helpers/database.validator.helper');

const {
  doLogin
} = require('../controllers/auth.controller');

const router = Router();

router.post('/login',[
  check('email','Invalid Email').isEmail(),
  check("password","Please enter a valid password").not().isEmpty(),
  validateFields
],
doLogin);

module.exports = router;