const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const {
  IMAGES_TMP_PATH,
  IMAGES_TMP_CACHE_SECONDS_TTL,
  IMAGES_TMP_CACHE_SECONDS_DELETE_TTL,
  IMAGES_TMP_CACHE_SECONDS_SAVE_DELETE_TTL
} = process.env;

const generateTemporalFile = (file , extensions = [], folder = '') => {
  return new Promise((resolve,reject) => {
    
    const extension = file.name.split('.').pop();

    if (!extensions.includes(extension)) {
      return reject(`The image must be ${extensions} files`);
    }
    
    const imageId = uuidv4();
    const fileName = `${imageId}.${extension}`;
    const uploadPath = path.join(process.env.IMAGES_TMP_PATH || '/tmp', folder, fileName);

    file.mv(uploadPath, (err) => {
      if (err){
        return reject('Internal error moving image');
      }
      resolve({
        imageId: imageId,
        name: fileName,
        path: uploadPath
      })
    });
  });
}

const moveProcessedFile = (file , oldPath = '', newFolder = '') => {
  return new Promise((resolve,reject) => {
    const newPath = path.join(process.env.IMAGES_TMP_PATH || '/tmp/process', newFolder, file);
    if (fs.existsSync(oldPath)) {
      fs.rename(oldPath, newPath, (err) => {
        if (err){
          console.log(err)
          return reject('Internal error moving image');
        }
        resolve({newPath});
      });
    }else {
      reject('Binary Image it doesn\'t exist');
    }
  });
}

const deleteUnusedFiles = (folder = '') => {
  const uploadPath = path.join(IMAGES_TMP_PATH || '/tmp', folder);
  setInterval(() => {
    if (fs.readdirSync(uploadPath).length !== 0) {
      const deletedFiles = _getListOfFiles(uploadPath);
      deletedFiles.forEach((file) => {
        try {
          fs.unlinkSync(path.join(uploadPath, file));
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, Number(IMAGES_TMP_CACHE_SECONDS_DELETE_TTL) * 1000);
}

const _getListOfFiles = (uploadPath) => {
  const ttl = Number(IMAGES_TMP_CACHE_SECONDS_TTL)*1000;
  const saveTtl = Number(IMAGES_TMP_CACHE_SECONDS_SAVE_DELETE_TTL)*1000;
  const deleteDate = new Date(Date.now() - (ttl+saveTtl));
  return _orderOldFiles(uploadPath,deleteDate);
}

const _orderOldFiles = (dir, dateToValidate) => {
  return fs.readdirSync(dir)
      .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
      .filter(file => fs.lstatSync(path.join(dir, file)).mtime < dateToValidate);
};

module.exports = {
  generateTemporalFile,
  moveProcessedFile,
  deleteUnusedFiles
}