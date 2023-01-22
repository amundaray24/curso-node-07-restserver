const { validationResult } = require('express-validator');

const { generateResponseError } = require('../helpers/errors.generator.helper');

const validateFields = (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return generateResponseError(res,400,'Invalid Parameters',errors);
  }
  next();
}


module.exports = {
  validateFields
}