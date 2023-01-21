const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJwt } = require('../helpers/jwt.generator.helper');

const doLogin = async (req,res = response) => {
  const {email, password} = req.body;

  try {

    //validar si existe el email
    const user = await User.findOne({email, status: true});
    let passwordValid = false;
    if (user) passwordValid = bcryptjs.compareSync(password,user.password);

    if (!user || !passwordValid){
      return res.status(400).json({
        type: 'FATAL',
        messages: [
          {
            message: 'Email or Password invalid'
          }
        ]
      });
    }

    const jwt = await generateJwt(user._id);
    
    res.header('tsec',jwt);

    res.json({
      msg: 'login OK'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'FATAL',
      messages: [
        {
          message: 'Error on login process, Please try again later'
        }
      ]
    });
  }
}

module.exports = {
  doLogin 
}