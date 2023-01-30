const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

module.exports = {
  generateTemporalFile,
  moveProcessedFile
}