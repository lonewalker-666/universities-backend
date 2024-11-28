/* eslint-disable no-useless-catch */
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import model from "../models/index.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    },
    config.accessSecret,
    { expiresIn: config.accessTokenExpiration }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    },
    config.refreshSecret,
    { expiresIn: config.refreshTokenExpiration }
  );
};

const issueToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.refreshSecret);
    const { id, firstName, lastName } = decoded;
    const user = {
      id,
      firstName,
      lastName
    };

    return generateAccessToken(user);
  } catch (error) {
    throw error;
  }
};

const authenticateToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove "Bearer " prefix if present
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      data: { message: "Authorization not provided" },
    });
  }

  try {
    // Check if token is expired
    const { exp } = jwt.decode(token);
    if (exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        data: { message: "Token has expired" },
      });
    }

    // Verify token with secret
    const decoded = jwt.verify(token, config.accessSecret);
    const { id, firstName, lastName, email, phoneNumber, plan_id } = decoded;

    // Check for active user session
    const checkUser = await model.UserLogs.findOne({
      where: { user_id: id, access_token: token, deleted_at: null },
    });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        data: { message: "Session Timed Out" },
      });
    }

    // Attach user data to request
    req.user = { id, firstName, lastName, email, phoneNumber, plan_id };
    next();

  } catch (error) {
    console.error("Token verification error:", error); // Log for debugging purposes
    return res.status(401).json({
      success: false,
      data: { message: "Token verification failed" },
    });
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  issueToken,
  authenticateToken,
};
