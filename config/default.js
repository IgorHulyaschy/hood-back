require('dotenv').config()
module.exports = {
  server: {
    baseUrl: process.env.SERVER_BASEURL,
    port: Number(process.env.SERVER_PORT),
  },
  sendGrid: {
    baseEmail: process.env.SENDGRID_BASEEMAIL,
    apiKey: process.env.SENDGRID_APIKEY,
    emailValidation: process.env.SENDGRID_EMAILVALIDATION,
    resetPassword: process.env.SENDGRID_RESETPASSWORD,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    bucketName: process.env.AWS_BUCKETNAME,
    userPhotoFolder: process.env.AWS_USERPHOTOFOLDER,
  },
  database: {
    username: process.env.DB_USERNAME,
    dbName: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST
  },
  defaultAvatar: process.env.DEFAULT_AVATAR,
  jwt: {
    secretOrKey: process.env.SECRETORKEY,
    accessTokenPayload: process.env.ACCESSSECRET,
    refreshTokenPayload: process.env.REFRESHSECRET
  }
};