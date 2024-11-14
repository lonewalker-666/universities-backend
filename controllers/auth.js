import loggers from "../config/logger.js";
import {
  createUserSchema,
  getOtpSchema,
  loginSchema,
  verifyOtpSchema,
} from "../validations/auth.js";
import model from "../models/index.js";
import { UniqueConstraintError } from "sequelize";
import { getCurrentTimestamp } from "../lib/util.js";
import { comparePassword, hashPassword } from "../middleware/secure.js";
import config from "../config/config.js";
import {
  addOtp,
  isValidOTP,
} from "../validations/validator.js";
import {
  generateAccessToken,
  generateRefreshToken,
  issueToken,
} from "../middleware/token.js";
import querystring from "querystring";
import EvenEmitter from "events";
import jwt from "jsonwebtoken";
import SendEmail from "../middleware/email.js";


const signUpEmitter = new EvenEmitter();

async function getOtp(req, res) {
  try {
    const { error } = getOtpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email } = req.body;
    const checkUser = await model.User.findOne({ where: { email } });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const templateId = config.msg91_otp_template_id;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await addOtp(otp, email);
    await SendEmail(email, { otp: otp }, templateId);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error in GetOtp:", error);
    loggers.error(error.message + " from GetOtp function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
}


async function verifyOtp(req,res) {
  try {
    const { error } = verifyOtpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, otp } = req?.body;
    const isValid = await isValidOTP(email, otp);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    await model.VerifiedEmails.create({
      email: email,
    });
    return res.json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    console.error("Error in Verify:", error);

    loggers.error(error.message + " from Verify function");
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, email, password, deviceID } =
    req.body;
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    loggers.error(
      "Validation error: " + error.details.map((err) => err.message).join(", ")
    );
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const verifiedData = await model.VerifiedEmails.findOne({
      where: { email: email },
      attributes: ["created_at"],
    });
    if (!verifiedData) {
      // return res.status(401).json({
      //   success: false,
      //   message: "Email Not Verified",
      // });
     return res.redirect("/signup");
    }

    const now = getCurrentTimestamp();
    console.log("Model User:", model.User); // Debugging

    const checkUser = await model.User.findOne({ where: { email } });
    if (checkUser) {
      throw new Error("User with this email already exists.");
    }

    const encryptPass = await hashPassword(password);
    const createUserFunction = await model.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptPass,
      password_lastUpdated: now,
      created_by: email,
      plan_id: 1,
      emailVerified: true,
    });
    const accessToken = await generateAccessToken(createUserFunction);
    console.log(accessToken);

    const refreshToken = await generateRefreshToken(createUserFunction);

    await model.UserLogs.create({
      user_id: createUserFunction.id,
      access_token: accessToken,
      refresh_token: refreshToken,
      deviceId: deviceID,
    });

    res.setHeader("authorization", accessToken);
    res.setHeader("x-refresh-token", refreshToken);
    loggers.info(
      "User created successfully: " + JSON.stringify(createUserFunction)
    );
    return res.json({
      success: true,
      message: "User created and logged in successfully",
    });
  } catch (error) {
    console.error("Error in createUser:", error);

    loggers.error(error.message + " from createUser function");

    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
}

async function login(req, res) {
  const { email, password, deviceID } = req.body;
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    loggers.error(
      "Validation error: " + error.details.map((err) => err.message).join(", ")
    );
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Find user by email
    const user = await model.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    // Generate JWT tokens
    const accessToken = await generateAccessToken(user);

    const refreshToken = await generateRefreshToken(user);
    const now = await getCurrentTimestamp();
    await model.UserLogs.update(
      {
        deleted_at: now,
      },
      { where: { user_id: user.id, deleted_at:null } }
    );
    await model.UserLogs.create({
      user_id: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
      deviceId: deviceID,
    });
    res.setHeader("authorization", accessToken);
    res.setHeader("x-refresh-token", refreshToken);
    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in login:", error);
    loggers.error(error.message + " from login function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
}

const issueRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req?.body;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }
    const decoded = jwt.verify(refreshToken, config.refreshSecret);
    const { id } = decoded;
    const userLogs = await model.UserLogs.findOne({
      where: { user_id: id, refresh_token: refreshToken, deleted_at: null },
    });
    if (!userLogs) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }
    const accessToken = await issueToken(refreshToken);
    const now = await getCurrentTimestamp();
    await model.UserLogs.update(
      {
        access_token: accessToken,
        updated_at: now,
      },
      { where: { id: userLogs.id } }
    )
    await res.setHeader("Authorization", accessToken);

    return res.json({
      success: true,
      message: "Token Refreshed",
      accessToken
    });
  } catch (error) {
    console.error("Error in login:", error);
    loggers.error(error.message + " from refresh token function");
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const googleSignUP = async (req, res) => {
  const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(
    {
      client_id: config.googleOauthClient,
      redirect_uri: "/dashboard",
      response_type: "code",
      scope:
        "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read",
    }
  )}`;
  console.log(googleOAuthURL);

  // Redirect user to Google for authentication
  res.redirect(googleOAuthURL);
};

const facebookLogin = async (req, res) => {
  const facebookOAuthURL = `https://www.facebook.com/v12.0/dialog/oauth?${querystring.stringify(
    {
      client_id: config.facebook_client_id,
      redirect_uri: "https://www.theuniversitiesusa.com/",
      scope: "email,public_profile", // Requesting necessary permissions
      response_type: "code",
      auth_type: "rerequest",
    }
  )}`;

  // Redirect user to the Facebook login URL
  res.redirect(facebookOAuthURL);
};

const facebookCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing." });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v12.0/oauth/access_token?${querystring.stringify(
        {
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          client_secret: CLIENT_SECRET,
          code,
        }
      )}`
    );

    const { access_token } = tokenResponse.data;

    // Optionally, fetch user profile data with the access token
    const userProfileResponse = await axios.get(
      `https://graph.facebook.com/me?${querystring.stringify({
        fields: "id,name,email",
        access_token,
      })}`
    );

    const userProfile = userProfileResponse.data;

    // Handle the user's information (store in database, create session, etc.)
    console.log(userProfile);

    // Redirect the user or return success
    res.redirect("/dashboard"); // or wherever you'd like the user to go
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Failed to authenticate via Facebook." });
  }
};

// const googleSignUP = async (req, res) => {
//   try {
//     const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(
//       {
//         client_id: config.googleOauthClient,
//         redirect_uri: "http://127.1.0.0:3000/overview",
//         response_type: "code",
//         scope:
//           "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read",
//       }
//     )}`;
//     console.log(googleOAuthURL);

//     res.write(`url: ${googleOAuthURL}`);

//     signUpEmitter.on("verified");
//     signUpEmitter.on("unAuthorised", async () => {
//       return res.status(401).json({
//         success: false,
//         message: "Session expired",
//       });
//     });
//     signUpEmitter.on("notVerified", async () => {
//       return res.status(500).json({
//         success: false,
//         message: "Internal Error",
//       });
//     });
//   } catch (err) {
//     logger.error(`Error occurred: ${err}`);
//     console.log("Login Error ---------", err);
//     return res.json({
//       responseCode: "500",
//       responseDescription: "Something went wrong",
//     });
//   }
// };

export {
  createUser,
  login,
  getOtp,
  issueRefreshToken,
  googleSignUP,
  facebookLogin,
  facebookCallback,
  verifyOtp,
};
