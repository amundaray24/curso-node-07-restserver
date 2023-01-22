const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID
  });
  const {name, picture, email} = ticket.getPayload();

  const [firstName, secondName, lastName, ...secondLastName] = name.split(' ').filter(Boolean);

  return {
    firstName,
    secondName,
    lastName,
    secondLastName: secondLastName.join(' '),
    image: picture,
    email
  }
}

module.exports = {
  googleVerify
}