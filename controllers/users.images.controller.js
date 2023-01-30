const {response, request} = require('express');

const { getAndDeleteCacheImage } = require('../helpers/cache.generator.helpers');
const { generateResponseError } = require('../helpers/errors.generator.helper');
const { moveProcessedFile } = require('../helpers/file.generator.helper');

const User = require('../models/user');
const Image = require('../models/images');

const createImage = async (req= request, res = response) => {
  
  const {userId, imageId} = req.body;

  try {
    let image = new Image(await getAndDeleteCacheImage(imageId));
    let movedImage = await moveProcessedFile(image.name,image.path,'/processed');
    image.path = movedImage.newPath;
    const savedImage = await image.save();
    await User.findByIdAndUpdate(userId,{image: savedImage.id});
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    return generateResponseError(res,400,err.message);
  }
}

const deleteImage = async (req= request, res = response) => {
  
  const {userId,imageId} = req.body;

  try {
    await Promise.all([
      User.findByIdAndUpdate(userId,{$unset: {image: 1 }}),
      Image.findByIdAndUpdate(imageId,{status:false})
    ]);
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    return generateResponseError(res,400,err.message);
  }
}

module.exports = {
  createImage,
  deleteImage
}