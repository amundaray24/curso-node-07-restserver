const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
  name : {
    type: String,
    required: [true, 'The category field its mandatory']
  },
  description : {
    type: String,
    required: [true, 'The description field its mandatory']
  },
  status : {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'coffee_users',
    required: [true, 'The user field its mandatory']
  }
});

categorySchema.methods.toJSON = function() {
  const { _id ,__v, user, status, ...rest} = this.toObject();
  return Object.assign({id: _id}, rest);
}

module.exports = model('coffee_categories',categorySchema,'coffee_categories');