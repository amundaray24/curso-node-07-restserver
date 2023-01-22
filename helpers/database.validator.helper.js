const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
  itsValidRole,
  validateUserByEmail,
  validateUserById
}