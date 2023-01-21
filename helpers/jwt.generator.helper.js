const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
  return new Promise((resolve,reject) => {
    const payload = {
      uid
    };

    jwt.sign(payload,'123456789',{
      expiresIn: 180
    }, (error, token) => {
      if (error) {
        console.log(error);
        reject('Error Generating JWT');
      } else {
        resolve(token);
      }
    })
  })
}

module.exports = {
  generateJwt
}