const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateResponseError } = require('../helpers/errors.generator.helper');
const { requestPaginatorGenerator, responsePaginationGenerator } = require('../helpers/pagination.generator.helper');


const listUsers = (req, res = response) => {
  
  const {page, pageSize} = req.query;
  const requestPagination = requestPaginatorGenerator(page,pageSize);

  Promise.all([
    User.countDocuments({status : true}),
    User.find({status : true})
      .skip(requestPagination.skip)
      .limit(requestPagination.limit)
  ])
  .then((response) => {
    const data = response[1];
    if (data.length>0) {
      const pagination = responsePaginationGenerator(requestPagination,data.length,response[0]);
      return res.json({
        data,
        pagination
      });
    }
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Users cant be listed',error);
    generateResponseError(res,400,'Users cant be listed');
  });
}

const createUser = (req, res = response) => {
  const {hasGoogle,status, image, ...rest } = req.body;
  const user = new User(rest);

  // encrypt
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(rest.password,salt);
  //save

  user.save()
    .then((data) => {
      console.log(`User Created ${data._id}`);
      res.header('Location',`${req.originalUrl}/${data._id}`);
      res.status(201).json({data});
    })
    .catch((error) => {
      console.log('User cant be created',error);
      generateResponseError(res,400,'User cant be created');
    });
}

const getUser = (req, res = response) => {

  const { userId } = req.params;

  User.findOne({
    _id: userId,
    status : true
  })
  .then((data) => {
    res.json({data});
  })
  .catch((error) => {
    console.log('User cant be find',error);
    generateResponseError(res,400,'User cant be find');
  });
}

const updateUser = (req, res = response) => {

  const { userId } = req.params;
  const {_id, hasGoogle,status, image, password, ...rest } = req.body;

  User.findByIdAndUpdate(userId,rest)
  .then( () => {
    console.log(`User updated ${userId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('User cant be updated',error);
    generateResponseError(res,400,'User cant be updated');
  });
}

const deleteUser = (req, res = response) => {

  const { userId } = req.params;

  User.findByIdAndUpdate(userId,{status: false})
  .then( () => {
    console.log(`User deleted ${userId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('User cant be deleted',error);
    generateResponseError(res,400,'User cant be deleted');
  });
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}