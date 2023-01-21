const Role = require('../models/role');
const Employee = require('../models/employee');

const itsValidRole = async (role = '') => {
  const existRole = await Role.findOne({role});
  if (!existRole) {
    throw new Error(`ERROR - Invalid role: ${role}`);
  }
}

const validateEmployeeByEmail = async (email = '' ) => {
  const exist = await Employee.findOne({email});
  if (exist) {
    throw new Error(`ERROR - Employee email already exist: ${email}`);
  } 
}

module.exports = {
  itsValidRole,
  validateEmployeeByEmail
}