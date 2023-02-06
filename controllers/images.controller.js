const {response, request} = require('express');
const { createCacheImage } = require('../helpers/cache.generator.helpers');

const { generateResponseError } = require('../helpers/errors.generator.helper');
const { generateTemporalFile } = require('../helpers/file.generator.helper');
const Image = require('../models/images');
const path = require('path');


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

const getImage = async (req= request, res = response) => {
  
  const {imageId} = req.params;

  if (imageId==='07_NODE_SERVER_DEFAULT_USER_PROFILE'){
    return res.sendFile(path.join(__dirname,'../uploads','default',`${imageId}.png`));
  }

  Image.findById(imageId).then((image) => {
    if(image) {
      res.sendFile(image.path);
    }else {
      res.sendStatus(204);
    }
  }).catch((err) => {
    console.log(err)
    return generateResponseError(res,400,err);
  });
}

module.exports = {
  createImage,
  getImage
}