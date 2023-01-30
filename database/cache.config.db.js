const redis = require('redis');

const {
  IMAGES_TMP_CACHE_HOST,
  IMAGES_TMP_CACHE_PORT,
  IMAGES_TMP_CACHE_PASSWORD
} = process.env;

const cacheClient = redis.createClient({
  url: `redis://${IMAGES_TMP_CACHE_HOST}:${IMAGES_TMP_CACHE_PORT}`,
  password: IMAGES_TMP_CACHE_PASSWORD
});

console.log(`CONNECTION - HOST: ${IMAGES_TMP_CACHE_HOST}, PORT: ${IMAGES_TMP_CACHE_PORT}`);

cacheClient.connect();

cacheClient.on('error', (err) =>  {
  console.log('ERROR - Cache error',err);
});

cacheClient.on('connect', () =>  {
  console.log('INFO - Cache Connected');
});

module.exports = {
  cacheClient
}