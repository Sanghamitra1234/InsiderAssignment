const {Storage} = require('@google-cloud/storage');
const path = require("path");

const GOOGLE_CLOUD_PROJECT_ID = 'idyllic-chimera-256507';
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname,'../../My First Project-de9aae2003a0.json'); 
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
    });

//storage.getBuckets().then(x => console.log(x));

//const imageBucket = storage.bucket('insider_111');

exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

exports.copyFileToGCS = (localFilePath, bucketName, options) => {
    options = options || {};
  
    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);
    
    return bucket.upload(localFilePath, options)
      .then(() => file.makePublic())
      .then(() => exports.getPublicUrl(bucketName, fileName));
  };