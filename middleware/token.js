/* eslint-disable no-useless-catch */
import jwt from "jsonwebtoken";
import config from "../config/config.js";



const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      mobile: user.mobile,
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
      email: user.email,
      mobile: user.mobile,
    },
    config.refreshSecret,
    { expiresIn: config.refreshTokenExpiration }
  );
};

const issueToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.refreshSecret);
    const { id, firstName, lastName, email, phoneNumber } = decoded;
    const user = {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    return generateAccessToken(user);
  } catch (error) {
    throw error;
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { exp } = jwt.decode(token);
      if (exp * 1000 < Date.now()) {
        return res.status(401).json({
          success: false,
          data: {
            message: "Token has expired",
          },
        });
      }
      const decoded = jwt.verify(token, config.accessSecret);
      const { id, firstName, lastName, email } = decoded;
      const user = {
        id,
        firstName,
        lastName,
        email,
      };

      req.user = user;
      next();
    } catch (error) {
      return res.json({
        success: false,
        data: {
          error,
        },
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      data: {
        message: "authorization not provided",
      },
    });
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  issueToken,
  authenticateToken,
};
