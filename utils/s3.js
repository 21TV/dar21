const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const path = require('path')





exports.uploadPic = async (file)=>{
  const fileStream = fs.createReadStream(file.path)
  console.log("fileStream =",fileStream);

  const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream,
  };
  try {
    const awsResponse = await s3.upload(params).promise();
    //require('fs').unlinkSync(imagePath)
    return {error: false, url: awsResponse.Location }
  }  catch (err) {
    return {error: true, message: err.message};
  }
}



exports.getFileStream = async (fileKey) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION
  });

  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_S3_BUCKET_NAME    
  }

  try {
    return  await s3.getObject(downloadParams).createReadStream()
   
  } catch (error) {
    return {error: 'File not founded'}
  }
  
}

