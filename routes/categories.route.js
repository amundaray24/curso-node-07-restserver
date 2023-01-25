const { Router } = require('express');
const {check} = require('express-validator');

const { validateJwt, roleValidator, validateFields } = require('../middleware');

const { 
  validateCategoryById,
  validateCategoryByIdName
 } = require('../helpers/database.validator.helper');

const { 
  listCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories.controller');

const router = Router();

router.get('/', [
  validateJwt
],
listCategories);

router.post('/', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('name').notEmpty().isLength({min:3}),
  check('name').custom(validateCategoryByIdName),
  check('description').notEmpty().isLength({min:3}),
  validateFields
],
createCategory);

router.get('/:categoryId', [
  validateJwt,
  check('categoryId','category-id - Invalid Mandatory Parameter').isMongoId(),
  check('categoryId').custom(validateCategoryById),
  validateFields
],
getCategory);

router.patch('/:categoryId', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('categoryId','category-id - Invalid Mandatory Parameter').isMongoId(),
  check('categoryId').custom(validateCategoryById),
  check('name').optional().isLength({min:3}),
  check('name').custom(validateCategoryByIdName),
  check('description').optional().isLength({min:3}),
  validateFields
],
updateCategory);

router.delete('/:categoryId', [
  validateJwt,
  roleValidator('ADMIN_ROLE'),
  check('categoryId','category-id - Invalid Mandatory Parameter').isMongoId(),
  check('categoryId').custom(validateCategoryById),  
  validateFields
],
deleteCategory);

module.exports = router;