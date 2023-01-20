const {response} = require('express');

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
  const requestBody = req.body;
  const response = requestBody;
  res.json(response);
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