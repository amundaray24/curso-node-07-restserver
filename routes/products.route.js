const { Router } = require('express');
const {check, query} = require('express-validator');

const { validateJwt, roleValidator, validateFields } = require('../middleware');

const { 
  validateCategoryById,
  validateProductById,
  validateProductByName
 } = require('../helpers/database.validator.helper');

const { 
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controller');

const router = Router();

router.get('/', [
  validateJwt,
  query('page','page - Invalid Pagination Parameter').optional().isInt({gt : 0}),
  query('pageSize','pageSize - Invalid Pagination Parameter').optional().isInt({gt : 0}),
  validateFields
],
listProducts);

router.post('/', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('name').notEmpty().isLength({min:3}),
  check('name').custom(validateProductByName),
  check('description').notEmpty().isLength({min:3}),
  check('price').optional().notEmpty().isFloat({gt : -1}),
  check('category','category - Invalid Mandatory Parameter').isMongoId(),
  check('category').custom(validateCategoryById),
  validateFields
],
createProduct);

router.get('/:productId', [
  validateJwt,
  check('productId','product-id - Invalid Mandatory Parameter').isMongoId(),
  check('productId').custom(validateProductById),
  validateFields
],
getProduct);

router.patch('/:productId', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('productId','product-id - Invalid Mandatory Parameter').isMongoId(),
  check('productId').custom(validateProductById),
  check('name').optional().isLength({min:3}),
  check('name').custom(validateProductByName),
  check('description').optional().isLength({min:3}),
  check('price').optional().isFloat({gt : -1}),
  check('category','category - Invalid Mandatory Parameter').optional().isMongoId(),
  check('category').optional().custom(validateCategoryById),
  validateFields
],
updateProduct);

router.delete('/:productId', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('productId','product-id - Invalid Mandatory Parameter').isMongoId(),
  check('productId').custom(validateProductById),  
  validateFields
],
deleteProduct);

module.exports = router;