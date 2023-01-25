const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  firstName : {
    type: String,
    required: [true, 'The firstName must be informed']
  },
  secondName : {
    type: String
  },
  lastName : {
    type: String,
    required: [true, 'The lastName must be informed']
  },
  secondLastName : {
    type: String
  },
  email : {
    type: String,
    required: [true, 'The email must be informed'],
    unique: true
  },
  password : {
    type: String,
    required: [true, 'The password must be informed']
  },
  image : {
    type: String
  },
  role : {
    type: String,
    required: [true, 'The roles must be informed'],
    // enum: ['ADMIN_ROLE','USER_ROLE']
  },
  status : {
    type: Boolean,
    default: true
  },
  hasGoogle : {
    type: Boolean,
    default: false
  }
});

userSchema.methods.toJSON = function() {
  const { _id ,__v, password, ...rest} = this.toObject();
  return Object.assign({id: _id}, rest);
}

module.exports = model('coffee_users',userSchema,'coffee_users');