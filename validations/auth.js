import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceID: Joi.string().default("").required()
});

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceID: Joi.string().default("").required(),
});

const getOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required().pattern(/^\d{6}$/),
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
  getOtpSchema,
  verifyOtpSchema
};
