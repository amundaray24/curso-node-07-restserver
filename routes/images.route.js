const { Router } = require('express');
const {check} = require('express-validator');

const { createImage, getImage } = require('../controllers/images.controller');

const { 
  validateJwt, 
  roleValidator, 
  validateFields, 
  validateImage,
} = require('../middleware');

const router = Router();

router.post('/',[
  validateJwt,
  roleValidator('ADMIN_ROLE','USER_ROLE'),
  validateImage
],
createImage);

router.get('/:imageId',[
  validateJwt,
  roleValidator('ADMIN_ROLE','USER_ROLE'),
  check('imageId','imageId - Invalid Mandatory Parameter, must be sended').notEmpty(),
  validateFields,
],
getImage);


module.exports = router;