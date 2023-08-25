const AWS = require('aws-sdk');
const { S3_BUCKET_NAME, AWS_REGION } = process.env;

const s3 = new AWS.S3({ region: AWS_REGION });

const uploadToS3 = (data, fileName) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: fileName,
            Body: data,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
};

module.exports = { uploadToS3 };
