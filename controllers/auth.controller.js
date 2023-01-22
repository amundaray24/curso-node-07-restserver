const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJwt } = require('../helpers/jwt.generator.helper');
const { generateResponseError } = require('../helpers/errors.generator.helper');
const { googleVerify } = require('../helpers/google.jwt.validator.helper');
const user = require('../models/user');

const doLogin = async (req = request ,res = response) => {
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
        secondLastName: user.secondLastName,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    generateResponseError(res,500,'Error on login process, Please try again later');
  }
}

const googleSignIn = async (req = request ,res = response) => {

  const {token} = req.body;

  try {
    const {firstName, secondName, lastName, secondLastName, email,image} = await googleVerify(token);
    
    let user = await User.findOne({email});

    if (!user) {
      //CREAR USUARIO
      const data = {
        firstName,
        secondName,
        lastName,
        secondLastName,
        email,
        password: 'GOOGLE_PASSWORD',
        image,
        role: 'USER_ROLE',
        hasGoogle : true
      }

      user = new User(data);
      await user.save();
    }

    if (!user.status) return generateResponseError(res,401,'Deleted Account contact us');

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
        secondLastName: user.secondLastName,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    generateResponseError(res,500,'Error on Google login process, Please try again later');
  }
}

module.exports = {
  doLogin,
  googleSignIn
}