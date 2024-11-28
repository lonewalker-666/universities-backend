import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envVarsSchema = Joi.object({
  //   NODE_ENV: Joi.string()
  //     .valid("development", "production", "test")
  //     .default("development"),
  PORT: Joi.number().default(8000),
  ACCESS_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.number().required(),
  REFRESH_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: Joi.number().required(),
  DB_URL: Joi.string().required(),
  MSG91_OTP_TEMPLATE_ID: Joi.string().required(),
  MSG91_KEY: Joi.string().required(),
  FACEBOOK_CLIENT_ID: Joi.string().required(),
  FACEBOOK_CLIENT_SECRET: Joi.string().required(),
  COLLEGES_API_END_POINT: Joi.string().required(),
  COLLEGES_API_KEY: Joi.string().required(),
  //   FRONTEND_URL: Joi.string().required(),
  CHAT_END_POINT: Joi.string().required(),
  SALT_ROUNDS: Joi.number().required(),
  GOOGLE_OAUTH_CLIENT: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

const config = {
  //   env: envVars.NODE_ENV,
  port: envVars.PORT,
  accessSecret: envVars.ACCESS_SECRET,
  accessTokenExpiration: envVars.ACCESS_TOKEN_EXPIRATION,
  refreshSecret: envVars.REFRESH_SECRET,
  refreshTokenExpiration: envVars.REFRESH_TOKEN_EXPIRATION,
  mysql: {
    host: envVars.DB_URL,
  },
  //   frontEndUrl: envVars.FRONTEND_URL,
  saltRounds: envVars.SALT_ROUNDS,
  chatUrl: envVars.CHAT_END_POINT,
  googleOauthClient: envVars.GOOGLE_OAUTH_CLIENT,
  msg91_otp_template_id: envVars.MSG91_OTP_TEMPLATE_ID,
  msg91_api_key: envVars.MSG91_KEY,
  facebook_client_id: envVars.FACEBOOK_CLIENT_ID,
  facebook_client_secret: envVars.FACEBOOK_CLIENT_SECRET,
  colleges_api_endpoint: envVars.COLLEGES_API_END_POINT,
  colleges_api_key: envVars.COLLEGES_API_KEY,
};

export default config;
