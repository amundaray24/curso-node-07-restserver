const { Router } = require('express');
const {check} = require('express-validator');

const { validateFields } = require('../middleware/fields.validator.middleware');

const { doLogin } = require('../controllers/auth.controller');

const router = Router();

router.post('/login',[
  check('email','email - Invalid Mandatory Parameter').isEmail(),
  check("password","password - Invalid Mandatory Parameter").not().isEmpty(),
  validateFields
],
doLogin);

module.exports = router;