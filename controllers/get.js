import model from "../models/index.js";
import loggers from "../config/logger.js";
import { Op } from "sequelize";
import essay from "../models/essay.cjs";

const getPlans = async (req, res) => {
  try {
    const plans = await model.Plan.findAll({
      attributes: ["id", "name", "amount", "discountedPercentage","price_id"],
      order: [["id", "Asc"]],
      include: [
        {
          model: model.PlanDescription, // Assuming `PlanDescription` is the related model
          attributes: ["description"], // Fields from the related PlanDescription table
          order: [["id", "Asc"]],
        },
      ],
      where:{active:1}
    });
    return res.json({
      success: true,
      message: "Plans fetched Successfully",
      data: plans,
    });
  } catch (error) {
    console.error("Error in getPlans:", error);

    loggers.error(error.message + " from getPlans function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGender = async (req, res) => {
  try {
    const gender = await model.Gender.findAll({
      attributes: ["id", "name"],
      order: [["id", "Asc"]],
    });
    return res.json({
      success: true,
      message: "Gender fetched Successfully",
      data: gender,
    });
  } catch (error) {
    console.error("Error in getGender:", error);

    loggers.error(error.message + " from getGender function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getRace = async (req, res) => {
  try {
    const race = await model.Race.findAll({
      attributes: ["id", "name"],
      order: [["id", "Asc"]],
    });
    return res.json({
      success: true,
      message: "race fetched Successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error in getRace:", error);

    loggers.error(error.message + " from getRace function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGradeLevel = async (req, res) => {
  try {
    const gradeLevel = await model.GradeLevel.findAll({
      attributes: ["id", "name"],
      order: [["id", "Asc"]],
    });
    return res.json({
      success: true,
      message: "gradeLevel fetched Successfully",
      data: gradeLevel,
    });
  } catch (error) {
    console.error("Error in getGradeLevel:", error);

    loggers.error(error.message + " from getGradeLevel function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHighSchool = async (req, res) => {
  try {
    const prefix = req?.params?.search || "";
    const whereClause = prefix ? { name: { [Op.like]: `${prefix}%` } } : {};
    const highSchool = await model.HighSchool.findAll({
      attributes: ["id", "name", "city", "state", "country"],
      where: whereClause,
      order: [["name", "Asc"]],
    });

    return res.json({
      success: true,
      message: "highSchool fetched Successfully",
      data: highSchool,
    });
  } catch (error) {
    console.error("Error in getHighSchool:", error);

    loggers.error(error.message + " from getHighSchool function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApTestSubjects = async (req, res) => {
  try {
    const apTestSubjects = await model.TestSubjects.findAll({
      attributes: ["id", "name", "total_score"],
      order: [["id", "Asc"]],
      where: { test_id: 3 },
    });
    return res.json({
      success: true,
      message: "apTestSubjects fetched Successfully",
      data: apTestSubjects,
    });
  } catch (error) {
    console.error("Error in getApTestSubjects:", error);

    loggers.error(error.message + " from getApTestSubjects function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOverview = async (req, res) => {
  try {
    const checkUser = await model.User.findOne({
      where: { id: req?.user?.id },
    });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const recentlyVisited = await model.VisitedColleges.findAll({
      where: { user_id: req?.user?.id, deleted_at: null },
      attributes: ["id", "college_id", "college_name", "city_state"],
      order: [["id", "DESC"]],
      limit: 3,
    });
    
    const essay = await model.Essay.findAll({
      where: { user_id: req?.user?.id, deleted_at: null },
      attributes: ["essayId", "title", "content"],
      order: [["id", "DESC"]],
      limit: 3,
    });
    return res.json({
      success: true,
      message: "Overview fetched Successfully",
      data: { recentlyVisited, essay },
    });
  } catch (error) {
    console.error("Error in getOverview:", error);

    loggers.error(error.message + " from getOverview function");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getGender,
  getPlans,
  getRace,
  getGradeLevel,
  getHighSchool,
  getApTestSubjects,
  getOverview
};
