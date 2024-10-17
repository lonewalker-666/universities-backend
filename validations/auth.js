import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceID: Joi.string().default("").required(),
});

const verifyGoogleUserSchema = Joi.object({
  credential: Joi.string().required(),
});

const verifyFacebookUserSchema = Joi.object({
  accesstoken: Joi.string().required(),
});

export {
  loginSchema,
  createUserSchema,
  verifyFacebookUserSchema,
  verifyGoogleUserSchema,
};
