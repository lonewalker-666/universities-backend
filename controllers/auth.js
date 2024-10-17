import loggers from "../config/logger.js";
import { createUserSchema, loginSchema } from "../validations/auth.js";
import model from "../models/index.js";
import { UniqueConstraintError } from "sequelize";
import { getCurrentTimestamp } from "../lib/util.js";
import { hashPassword } from "../middleware/secure.js";

async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    loggers.error(
      "Validation error: " + error.details.map((err) => err.message).join(", ")
    );
    return res.json({
      success: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
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
    });

    loggers.info(
      "User created successfully: " + JSON.stringify(createUserFunction)
    );

    return res.json({
      success: true,
      message: "User created successfully",
      data: createUserFunction,
    });
  } catch (error) {
    console.error("Error in createUser:", error);

    loggers.error(error.message + " from createUser function");

    if (error instanceof UniqueConstraintError) {
      return res.json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    return res.json({
      success: false,
      message: error.message,
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
    return res.json({
      success: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m', // Set token expiration
    });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Set token expiration
    });

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        deviceID, // Optionally return the deviceID
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    loggers.error(error.message + " from login function");
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
}

export { createUser,login };
