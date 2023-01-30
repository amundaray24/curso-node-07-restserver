const {response, request} = require('express');
const { createCacheImage } = require('../helpers/cache.generator.helpers');

const { generateResponseError } = require('../helpers/errors.generator.helper');
const { generateTemporalFile } = require('../helpers/file.generator.helper');

const createImage = async (req= request, res = response) => {
  
  try {
    const image = await generateTemporalFile(req.files.image,['png','jpg','jpeg','gif'],'temporal');
    await createCacheImage(image);
    res.status(200).json({imageId: image.imageId});
  } catch (err) {
    console.log(err);
    generateResponseError(res,400,err);
  }
}

module.exports = {
  createImage,
}