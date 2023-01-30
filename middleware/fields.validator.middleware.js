const { validationResult } = require('express-validator');

const User = require('../models/user');
const { generateResponseError } = require('../helpers/errors.generator.helper');

const validateFields = (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return generateResponseError(res,400,'Invalid Parameters',errors);
  }
  next();
}

const validateImage = (req,res,next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image){
    return generateResponseError(res,400,'Must be send Image');
  }
  next();
}

const validateUserNotImage = (req,res,next) => {

  const {_id, role } = req.context.user;

  if (role === 'USER_ROLE' && req.params.userId!==_id.toString()) {
    return generateResponseError(res,400,'Denied Permission for this user');
  }

  const userId = role === 'USER_ROLE' ? _id.toString() : req.params.userId || _id.toString();

  User.findById({_id:userId}).and({image:undefined}).then((data) => {
    if (data) {
      req.body.userId = userId
      next();
    } else {
      generateResponseError(res,400,'User already have image');
    }
  });
}

const validateUserImage = (req,res,next) => {

  const {_id, role } = req.context.user;
  
  if (role === 'USER_ROLE' && req.params.userId!==_id.toString()) {
    return generateResponseError(res,400,'Denied Permission for this user');
  }

  const userId = role === 'USER_ROLE' ? _id.toString() : req.params.userId || _id.toString();

  User.findById({_id:userId}).and({image:{$exists:true}}).then((data) => {
    if (data) {
      req.body.userId = userId;
      req.body.imageId = data.imageId;
      next();
    } else {
      generateResponseError(res,400,'User doesn\'t have image');
    }
  });
}


module.exports = {
  validateFields,
  validateImage,
  validateUserNotImage,
  validateUserImage
}