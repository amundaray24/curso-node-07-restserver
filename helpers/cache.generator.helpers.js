const { cacheClient } = require('../database/cache.config.db');

const {
  IMAGES_TMP_CACHE_KEY,
  IMAGES_TMP_CACHE_SECONDS_TTL
} = process.env;

const key = IMAGES_TMP_CACHE_KEY || 'IMAGE_CACHE';
const ttl= Number(IMAGES_TMP_CACHE_SECONDS_TTL) || 60

const createCacheImage = (image) => {
  return new Promise((resolve,reject) => {
    try {
      cacheClient.HSET(key, image.imageId, JSON.stringify(image));
      cacheClient.expire(key, ttl);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

const getAndDeleteCacheImage = (imageId) => {
  return new Promise((resolve,reject) => {
    try {
      cacheClient.HGET(key,imageId)
      .then((data) => {
        if (!data) {
          reject('Image it doesn\'t exist');
        } else {
          cacheClient.HDEL(key,imageId);    
          resolve(JSON.parse(data));
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createCacheImage,
  getAndDeleteCacheImage
}