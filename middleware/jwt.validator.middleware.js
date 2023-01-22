const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { generateResponseError } = require('../helpers/errors.generator.helper');

const validateJwt = (req = request, res=response, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return generateResponseError(res,401,'Authorization Token not sended');
  }
  try {
    const {uid} = jwt.verify(token,process.env.JWT_SECRET);
    User.findById({_id:uid}).and({status:true}).then((data) => {
      if (data) {
        req.context = {user:data}
        next();
      } else {
        generateResponseError(res,401,'Invalid Authorization Token');
      }
    });
  } catch (error) {
    console.log(error);
    generateResponseError(res,401,'Invalid Authorization Token');    
  }
}



module.exports = {
  validateJwt
}