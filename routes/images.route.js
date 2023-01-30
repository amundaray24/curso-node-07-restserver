const { Router } = require('express');

const { validateJwt, roleValidator, validateImage } = require('../middleware');
const { createImage } = require('../controllers/images.controller');

const router = Router();

router.post('/',[
  validateJwt,
  roleValidator('ADMIN_ROLE','USER_ROLE'),
  validateImage
],
createImage);


module.exports = router;