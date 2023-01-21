const mongoose = require('mongoose');

const createConnection = async () => {

  const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DOMAIN,
    MONGO_DATABASE,
    MONGO_PORT,
  } = process.env;

  mongoose.set('strictQuery',true);
  await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}/${MONGO_DATABASE}`).then(() => {
    console.log('INFO - Database Connected');
  })
  .catch((error) => {
    console.log(error);
    throw new Error('FATAL - Connection database error');
  });
}

module.exports = {
  createConnection
}