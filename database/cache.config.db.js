const redis = require('redis');

const {
  IMAGES_TMP_CACHE_HOST,
  IMAGES_TMP_CACHE_PORT,
  IMAGES_TMP_CACHE_PASSWORD
} = process.env;

const cacheClient = redis.createClient({
  host: IMAGES_TMP_CACHE_HOST,
  port: IMAGES_TMP_CACHE_PORT,
  password: IMAGES_TMP_CACHE_PASSWORD
});

cacheClient.connect();

cacheClient.on('connect', () =>  {
  console.log('INFO - Cache Connected');
});

module.exports = {
  cacheClient
}