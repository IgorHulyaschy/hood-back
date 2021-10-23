const Router = require("koa-joi-router");
const { UserDB } = require("./models/UserDB");
const joi = Router.Joi;

const auth = {
  email: joi.string().min(3).max(20).required(),
  password: joi.string().min(6).max(20).required(),
};
const usersData = {
  fname: joi.string().min(3).max(20).required(),
  lname: joi.string().min(3).max(20).required(),
  login: joi.string().min(3).max(20).required(),
};

exports.signUp = {
  validate: {
    type: "json",
    body: {
      ...auth,
      ...usersData,
      
    },
    output: {
      201: {
        body: {
          ...usersData,
          email: joi.string().min(3).max(20).required(),
          categoryId: joi.number().required(),
          photo: joi.required() 
        },
      },
    },
  },
};

exports.updateCategory = {
  validate: {
    type: "json",
    body: {
      categoryid: joi.number().max(20).required(),
      email: joi.string().min(3).max(20).required(),
    },
  }
}


exports.signIn = {
  validate: {
    type: 'json',
    body: {
      ...auth,
    },
  },
};
