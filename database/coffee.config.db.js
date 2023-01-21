const mongoose = require('mongoose');

const createConnection = () => {
  mongoose.set('strictQuery',true);
  mongoose.connect(process.env.MONGO_DB_URL).then(() => {
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