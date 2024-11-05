import model from "../models/index.js";
import loggers from "../config/logger.js";
import { getEssayOneDataSchema } from "../validations/essay.js";

const getEssay = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Found.",
      });
    }
    const essays = await model.Essay.findAll({
      order: [["id", "DESC"]],
      where: { user_id },
    });
    return res.json({ success: true, essays });
  } catch (error) {
    loggers.error(error);
    return res.json({ success: false, message: error.message });
  }
};


const getEssayOne = async (req, res) => {
  try {
    const { error } = getEssayOneDataSchema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Found.",
      });
    }
    const essays = await model.Essay.findOne({
      where: { user_id,essayId: req.params.essayId },
    });
    if (!essays) {
      return res.json({
        success: false,
        message: "Invalid Essay Id",
      });
    }
    return res.json({ success: true,message:"Essay Found", essays });
  } catch (error) {
    loggers.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { getEssay,getEssayOne };