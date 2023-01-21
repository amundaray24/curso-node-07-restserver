const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Employee = require('../models/employee');


const listUsers = (req, res = response) => {
  
  const {pageKey = 0, pageSize = 10 } = req.query;
  const pageKeyNumber = Number(pageKey);
  const pageSizeNumber = Number(pageSize);

  Promise.all([
    Employee.countDocuments({status : true}),
    Employee.find({status : true})
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
    console.log('Employees cant be listed',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Employees cant be listed'
        }
      ]
    });
  });
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
      res.json({data});
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

  const { userId } = req.params;

  Employee.findOne({
    _id: userId,
    status : true
  })
  .then((data) => {
    res.json({data});
  })
  .catch((error) => {
    console.log('Employee cant be find',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Employee cant be find'
        }
      ]
    });
  });
}

const updateUser = (req, res = response) => {

  const { userId } = req.params;
  const {_id, hasGoogle,status, image, password, ...rest } = req.body;
  //TODO cambio de contraseña (cifrado)

  Employee.findByIdAndUpdate(userId,rest)
  .then( () => {
    console.log(`Employee updated ${userId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Employee cant be updated',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Employee cant be updated'
        }
      ]
    });
  });
}

const deleteUser = (req, res = response) => {

  const { userId } = req.params;

  Employee.findByIdAndUpdate(userId,{status: false})
  .then( () => {
    console.log(`Employee deleted ${userId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Employee cant be deleted',error);
    res.status(400).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Employee cant be deleted'
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