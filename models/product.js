const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  name : {
    type: String,
    required: [true, 'The category field its mandatory']
  },
  description : {
    type: String,
    required: [true, 'The description field its mandatory']
  },
  itsAvailable : {
    type: Boolean,
    default: true
  },
  price : {
    type: Number,
    default: 0
  },
  status : {
    type: Boolean,
    default: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'coffee_categories',
    required: [true, 'The user field its mandatory']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'coffee_users',
    required: [true, 'The user field its mandatory']
  }
});

productSchema.methods.toJSON = function() {
  const { _id ,__v, user, category, status, ...rest} = this.toObject();
  const response = {
    id: _id,
    ...rest,
    category: {
      id: category._id,
      name: category.name
    }
  }
  return response;
}

module.exports = model('coffee_products',productSchema,'coffee_products');