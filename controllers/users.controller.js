const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Employee = require('../models/employee');


const listUsers = (req, res = response) => {

  const {pageKey = 1, pageSize = 15} = req.query;

  const response = {
    greeting : 'GET-LIST',
    pageKey,
    pageSize
  }
  res.json(response);
}

const createUser = (req, res = response) => {
  const {hasGoogle,status, image, ...rest } = req.body;
  const user = new Employee(rest);

  // encrypt
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(rest.password,salt);
  //save

  user.save()
    .then((data) => {
      console.log(`Employee Created ${data}`);
      res.json(data);
    })
    .catch((error) => {
      console.log('Employee cant be created',error);
      res.status(400).json({
        type: 'FATAL',
        messages: [
          {
            message: 'Employee cant be created'
          }
        ]
      });
    });
}

const getUser = (req, res = response) => {
  const response = {
    greeting : req.params.userId
  }
  res.json(response);
}

const updateUser = (req, res = response) => {
  const response = {
    greeting : req.params.userId
  }
  res.json(response);
}

const deleteUser = (req, res = response) => {
  const response = {
    greeting : req.params.userId
  }
  res.json(response);
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}