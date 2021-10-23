const AWS = require('aws-sdk');
const config = require('config');

const options = {
  accessKeyId: config.get('aws.accessKeyId'),
  secretAccessKey: config.get('aws.secretAccessKey'),
};

AWS.config.update(options);

module.exports = AWS;