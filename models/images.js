const {Schema, model} = require('mongoose');

const imageSchema = new Schema({
  imageId : {
    type: String,
    required: [true, 'The imageId field its mandatory']
  },
  name : {
    type: String,
    required: [true, 'The name field its mandatory']
  },
  path : {
    type: String,
    required: [true, 'The path field its mandatory']
  },
  status : {
    type: Boolean,
    default: true
  },
});

imageSchema.methods.toJSON = function() {
  const { _id ,__v, ...rest} = this.toObject();
  return Object.assign({id: _id}, rest);
}

module.exports = model('coffee_images',imageSchema,'coffee_images');