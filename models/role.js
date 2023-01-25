const {Schema, model} = require('mongoose');

const roleSchema = new Schema({
  role : {
    type: String,
    required: [true, 'The role field its mandatory']
  },
  description : {
    type: String,
    required: [true, 'The description field its mandatory']
  }
});

module.exports = model('coffee_roles',roleSchema,'coffee_roles');