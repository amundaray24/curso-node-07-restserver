const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');

const itsValidRole = async (role = '') => {
  const existRole = await Role.findOne({role});
  if (!existRole) {
    throw new Error(`role - Invalid Mandatory Parameter, Invalid value: ${role}`);
  }
}

const validateUserByEmail = async (email = '' ) => {
  const exist = await User.findOne({email});
  if (exist) {
    throw new Error(`email - Invalid Mandatory Parameter, User email already exist: ${email}`);
  } 
}

const validateUserById = async (_id = '' ) => {
  const exist = await User.countDocuments({_id,status:true});
  if (exist===0) {
    throw new Error(`user-id - Invalid Mandatory Parameter, User doesn't exist: ${_id}`);
  } 
}

const validateCategoryById = async (_id = '') => {
  const exist = await Category.countDocuments({_id,status:true});
  if (exist===0){
    throw new Error(`category-id - Invalid Mandatory Parameter, Category doesn't exist: ${_id}`);
  }
}

const validateCategoryByName = async (name = '') => {
  const exist = await Category.findOne({name : name.toUpperCase()});
  if (exist){
    throw new Error(`category-id - Invalid Mandatory Parameter, Category name already exist: ${name}`);
  }
}

const validateProductById = async (_id = '') => {
  const exist = await Product.countDocuments({_id,status:true});
  if (exist===0){
    throw new Error(`product-id - Invalid Mandatory Parameter, Product doesn't exist: ${_id}`);
  }
}

const validateProductByName = async (name = '') => {
  const exist = await Product.findOne({name : name.toUpperCase()});
  if (exist){
    throw new Error(`product-id - Invalid Mandatory Parameter, Product name already exist: ${name}`);
  }
}


module.exports = {
  itsValidRole,
  validateUserByEmail,
  validateUserById,
  validateCategoryById,
  validateCategoryByName,
  validateProductById,
  validateProductByName
}