const { request, response } = require("express")

const { generateResponseError } = require('../helpers/errors.generator.helper');

const roleValidator = ( ...roles) => {
  return (req = request, res = response, next) => {

    if (!req.context.user){
      return generateResponseError(res,401,'Invalid request User without session');
    }

    const {role} = req.context.user;
    if (!roles.includes(role)) {
      return generateResponseError(res,401,'Denied Permission for this operation');
    }
    next();
  }
}

module.exports = {
  roleValidator
}