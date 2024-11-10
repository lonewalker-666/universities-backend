import model from "../models/index.js";
import loggers from "../config/logger.js";
import {
  createEssayDataSchema,
  editEssayDataSchema,
  getEssayOneDataSchema,
} from "../validations/essay.js";
import { UniqueConstraintError } from "sequelize";

const getEssay = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(400).json({
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
    return res.status(500).json({ success: false, message: error.message });
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
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const essays = await model.Essay.findOne({
      where: { user_id, essayId: req.params.essayId },
    });
    if (!essays) {
      return res.status(404).json({
        success: false,
        message: "Invalid Essay Id",
      });
    }
    return res.json({ success: true, message: "Essay Found", essays });
  } catch (error) {
    loggers.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createEssay = async (req, res) => {
  try {
    const { error } = createEssayDataSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { content, title } = req.body;
    await model.Essay.create({
      user_id,
      content,
      title,
    });
    return res.json({ success: true, message: "Essay Created" });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message: "An essay with this title already exists.",
      });
    }
    loggers.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editEssay = async (req, res) => {
  try {
    const { error } = editEssayDataSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { content, title,essayId } = req.body;

    const getEssay = await model.Essay.findOne({
      where: { user_id, essayId },
    })
    if (!getEssay) {
      return res.status(400).json({
        success: false,
        message: "Essay Not Found.",
      });
    }
    await model.Essay.update({
      essayId,
      content,
      title,
    });
    return res.json({ success: true, message: "Essay Updated" });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message: "An essay with this title already exists.",
      });
    }
    loggers.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getEssay, getEssayOne, createEssay,editEssay };
