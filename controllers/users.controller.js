const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const listUsers = (req, res = response) => {
  
  const {pageKey = 0, pageSize = 10 } = req.query;
  const pageKeyNumber = Number(pageKey);
  const pageSizeNumber = Number(pageSize);

  Promise.all([
    User.countDocuments({status : true}),
    User.find({status : true})
      .skip(pageKeyNumber === 0 ? 0 : pageKeyNumber-1)
      .limit(pageSizeNumber)    
  ])
  .then((response) => {
    const totalElements = response[0];
    const data = response[1];
    if (totalElements>0) {
      return res.json({
        data,
        pagination: {
          totalElements
        }
      });
    }
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Users cant be listed',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Users cant be listed'
        }
      ]
    });
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
      res.json({data});
    })
    .catch((error) => {
      console.log('User cant be created',error);
      res.status(400).json({
        type: 'FATAL',
        messages: [
          {
            message: 'User cant be created'
          }
        ]
      });
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
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'User cant be find'
        }
      ]
    });
  });
}

const updateUser = (req, res = response) => {

  const { userId } = req.params;
  const {_id, hasGoogle,status, image, password, ...rest } = req.body;
  //TODO cambio de contraseña (cifrado)

  User.findByIdAndUpdate(userId,rest)
  .then( () => {
    console.log(`User updated ${userId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('User cant be updated',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'User cant be updated'
        }
      ]
    });
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
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'User cant be deleted'
        }
      ]
    });
  });
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}