const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJwt } = require('../helpers/jwt.generator.helper');
const { generateResponseError } = require('../helpers/errors.generator.helper');

const doLogin = async (req,res = response) => {
  const {email, password} = req.body;

  try {

    //validar si existe el email
    const user = await User.findOne({email, status: true});
    let passwordValid = false;
    if (user) passwordValid = bcryptjs.compareSync(password,user.password);

    if (!user || !passwordValid) return generateResponseError(res,400,'Email or Password invalid');
    

    const jwt = await generateJwt(user._id);
    
    res.header('Authorization',jwt);

    res.json({
      authentication: {
        state: 'OK'
      },
      user: {
        firstName : user.firstName,
        secondName : user.secondName,
        lastName: user.lastName,
        secondLastName: user.secondLastName
      }
    });

  } catch (error) {
    console.log(error);
    generateResponseError(res,500,'Error on login process, Please try again later');
  }
}

module.exports = {
  doLogin 
}