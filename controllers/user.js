import {
  AddExtracurricularsSchema,
  AddPreferedCollegeSchema,
  AddPreferedMajorSchema,
  createProfileSchema,
  DeleteExtracurricularsSchema,
  DeletePreferedCollegeSchema,
  DeletePreferedMajorSchema,
  updateAccademicBackgroundSchema,
  updateActTestScoreSchema,
  updateAdditionalInfoSchema,
  updateAPTestScoreSchema,
  updateIELTSTestScoreSchema,
  updatePersonalInfoSchema,
  updateProfilePersonalSchema,
  updateProfileSchema,
  updateSatTestScoreSchema,
  updateTOEFLTestScoreSchema,
} from "../validations/user.js";
import loggers from "../config/logger.js";
import model from "../models/index.js";
import { getCurrentTimestamp } from "../lib/util.js";

const createProfile = async (req, res) => {
  try {
    const { error } = createProfileSchema.validate(req.body, {
      abortEarly: false,
    });
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
    const {
      firstName,
      lastName,
      email,
      dob,
      gender_id,
      mobile,
      profileEmojiId,
      location,
    } = req.body;
    const user_id = req?.user?.id || "";
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    await model.User.update(
      {
        firstName,
        lastName,
        email,
        dob,
        gender_id,
        mobile,
        profileEmojiId,
        location,
      },
      { where: { id: user_id } }
    );
    return res.json({
      success: true,
      message: "Profile Created Successfully",
    });
  } catch (error) {
    console.error("Error in createProfile:", error);

    loggers.error(error.message + " from createProfile function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updatePersonalInfo = async (req, res) => {
  try {
    const { error } = updatePersonalInfoSchema.validate(req.body, {
      abortEarly: false,
    });
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
    const {
      race_id,
      armed_force_status_id,
      first_generation_id,
      citizenship_id,
      about,
    } = req.body;
    const user_id = req?.user?.id || "";
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const result = await model.User.update(
      {
        race_id,
        armed_force_status_id,
        first_generation_id,
        citizenship_id,
        about,
      },
      { where: { id: user_id } }
    );
    return res.json({
      success: true,
      message: "Personal Info updated Successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in updatePersonalInfo:", error);

    loggers.error(error.message + " from updatePersonalInfo function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateAccademicBackground = async (req, res) => {
  try {
    const { error } = updateAccademicBackgroundSchema.validate(req.body, {
      abortEarly: false,
    });
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
    const {
      highSchool_id,
      grade_level_id,
      college_start_date,
      graduation_date,
      gpa,
      class_rank,
    } = req.body;
    const user_id = req?.user?.id || "";
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    await model.User.update(
      {
        highSchool_id,
        grade_level_id,
        college_start_date,
        graduation_date,
        gpa,
        class_rank: class_rank || null,
      },
      { where: { id: user_id } }
    );
    return res.json({
      success: true,
      message: "Accademic Background Info updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateAccademicBackground:", error);

    loggers.error(error.message + " from updateAccademicBackground function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateActTestScore = async (req, res) => {
  try {
    const { error } = updateActTestScoreSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const now = getCurrentTimestamp();
    const scoreData = req.body.map((item) => ({
      user_id,
      subject_id: item.subject_id,
      score: item.score,
      test_id: 1,
      created_by: checkUser.email,
      updated_at: now,
      updated_by: checkUser.email,
    }));

    await model.TestScore.bulkCreate(scoreData, {
      updateOnDuplicate: ["score", "updated_at", "updated_by"], // Columns to update on conflict
    });
    res.json({ success: true, message: "Act test score updated successfully" });
  } catch (error) {
    console.error("Error in updateActTestScore:", error);

    loggers.error(error.message + " from updateActTestScore function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateSatTestScore = async (req, res) => {
  try {
    const { error } = updateSatTestScoreSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const now = getCurrentTimestamp();
    const scoreData = req.body.map((item) => ({
      user_id,
      subject_id: item.subject_id,
      score: item.score,
      test_id: 2,
      created_by: checkUser.email,
      updated_at: now,
      updated_by: checkUser.email,
    }));

    await model.TestScore.bulkCreate(scoreData, {
      updateOnDuplicate: ["score", "updated_at", "updated_by"], // Columns to update on conflict
    });
    res.json({ success: true, message: "SAT test score updated successfully" });
  } catch (error) {
    console.error("Error in updateSatTestScore:", error);

    loggers.error(error.message + " from updateSatTestScore function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateToeflTestScore = async (req, res) => {
  try {
    const { error } = updateTOEFLTestScoreSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const now = getCurrentTimestamp();
    const scoreData = req.body.map((item) => ({
      user_id,
      subject_id: item.subject_id,
      score: item.score,
      test_id: 4,
      created_by: checkUser.email,
      updated_at: now,
      updated_by: checkUser.email,
    }));

    await model.TestScore.bulkCreate(scoreData, {
      updateOnDuplicate: ["score", "updated_at", "updated_by"], // Columns to update on conflict
    });
    res.json({
      success: true,
      message: "TOEFL test score updated successfully",
    });
  } catch (error) {
    console.error("Error in updateToeflTestScore:", error);

    loggers.error(error.message + " from updateToeflTestScore function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateIELTSTestScore = async (req, res) => {
  try {
    const { error } = updateIELTSTestScoreSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const now = getCurrentTimestamp();
    const scoreData = req.body.map((item) => ({
      user_id,
      subject_id: item.subject_id,
      score: item.score,
      test_id: 5,
      created_by: checkUser.email,
      updated_at: now,
      updated_by: checkUser.email,
    }));

    await model.TestScore.bulkCreate(scoreData, {
      updateOnDuplicate: ["score", "updated_at", "updated_by"], // Columns to update on conflict
    });
    res.json({
      success: true,
      message: "IELTS test score updated successfully",
    });
  } catch (error) {
    console.error("Error in updateIELTSTestScore:", error);

    loggers.error(error.message + " from updateIELTSTestScore function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateAPTestScore = async (req, res) => {
  try {
    const { error } = updateAPTestScoreSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { subject_id, score } = req.body;
    const checkSubject = await model.TestSubjects.findOne({
      where: { id: subject_id, test_id: 3 },
    });
    if (!checkSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject Not Found.",
      });
    }
    const now = getCurrentTimestamp();

    await model.TestScore.create(
      {
        user_id,
        subject_id,
        score,
        test_id: 3,
        created_by: checkUser.email,
        updated_at: now,
        updated_by: checkUser.email,
      },
      {
        updateOnDuplicate: ["score", "updated_at", "updated_by"], // Columns to update on conflict
      }
    );
    res.json({
      success: true,
      message: "AP test score updated successfully",
    });
  } catch (error) {
    console.error("Error in updateAPTestScore:", error);

    loggers.error(error.message + " from updateAPTestScore function");

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const profile = await model.User.findOne({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "gender_id",
        "dob",
        "profileEmojiId",
        "grade_level_id",
        "college_start_date",
        "graduation_date",
        "gpa",
        "high_school_id",
        "race_id",
        "armed_force_status_id",
        "first_generation_id",
        "citizenship_id",
        "about",
        "financial_aid_id",
        "location",
        "houseHeld",
        "physical_disability",
        "additionalInfo",
      ],
      where: { id: user_id },
      include: [
        {
          model: model.HighSchool,
          attributes: ["id", "name","state"],
        },
        {
          model: model.GradeLevel,
          attributes: ["id", "name"],
        },
        {
          model: model.Gender,
          attributes: ["id", "name"],
        },
        {
          model: model.Race,
          attributes: ["id", "name"],
        },
        {
          model: model.Armed_Force_Status,
          attributes: ["id", "name"],
        },
        {
          model: model.FirstGeneration,
          attributes: ["id", "name"],
        },
        {
          model: model.Citizenship,
          attributes: ["id", "name"],
        },
        {
          model: model.FinancialAid,
          attributes: ["id", "name"],
        },
        {
          model: model.TestScore,
          attributes: ["test_id", "subject_id", "score"],
          order: [["id", "Asc"]],
          include: [
            {
              model: model.TestSubjects,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "User Not Found.",
      });
    }
    return res.json({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    loggers.error(error.message + " from getProfile function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const {
      firstName,
      lastName,
      email,
      mobile,
      // dob,
      profileEmojiId,
      location,
      // about,
    } = req.body;
    await model.User.update(
      {
        firstName,
        lastName,
        email,
        mobile,
        location,
        // dob,
        profileEmojiId,
        // about,
      },
      { where: { id: user_id } }
    );
    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    loggers.error(error.message + " from updateProfile function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateProfilePersonal = async (req, res) => {
  try {
    const { error } = updateProfilePersonalSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const {
      race_id,
      gender_id,
      armed_force_status_id,
      first_generation_id,
      citizenship_id,
      financial_aid_id,
    } = req.body;
    await model.User.update(
      {
        race_id,
        armed_force_status_id,
        first_generation_id,
        citizenship_id,
        gender_id,
        financial_aid_id,
      },
      { where: { id: user_id } }
    );
    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updateProfilePersonal:", error);
    loggers.error(error.message + " from updateProfilePersonal function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateAdditionalInfo = async (req, res) => {
  try {
    const { error } = updateAdditionalInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { houseHeld, physical_disability, additionalInfo } = req.body;
    await model.User.update(
      {
        houseHeld,
        physical_disability,
        additionalInfo,
      },
      { where: { id: user_id } }
    );
    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updateAdditionalInfo:", error);
    loggers.error(error.message + " from updateAdditionalInfo function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const AddExtracurriculars = async (req, res) => {
  try {
    const { error } = AddExtracurricularsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { activity } = req.body;
    const extraCurriculars = await model.ExtraCurriculars.create({
      activity,
      user_id,
      created_by: checkUser.email,
    });
    res.json({
      success: true,
      message: "Extracurriculars added successfully",
      data: { id: extraCurriculars?.id, activity: extraCurriculars?.activity },
    });
  } catch (error) {
    console.error("Error in AddExtracurriculars:", error);
    loggers.error(error.message + " from AddExtracurriculars function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const DeleteExtracurriculars = async (req, res) => {
  try {
    const { error } = DeleteExtracurricularsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { activity_id } = req.body;
    const now = getCurrentTimestamp();
    await model.ExtraCurriculars.update(
      {
        deleted_at: now,
        deleted_by: checkUser.email,
      },
      {
        where: { id: activity_id },
      }
    );
    res.json({
      success: true,
      message: "Extracurriculars deleted successfully",
    });
  } catch (error) {
    console.error("Error in DeleteExtracurriculars:", error);
    loggers.error(error.message + " from DeleteExtracurriculars function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const AddPreferedCollege = async (req, res) => {
  try {
    const { error } = AddPreferedCollegeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { college } = req.body;
    const preferedColleges = await model.PreferedColleges.create({
      name: college,
      user_id,
      created_by: checkUser.email,
    });
    res.json({
      success: true,
      message: "Prefered College added successfully",
      data: { id: preferedColleges?.id, college: preferedColleges?.name },
    });
  } catch (error) {
    console.error("Error in AddPreferedCollege:", error);
    loggers.error(error.message + " from AddPreferedCollege function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const DeletePreferedCollege = async (req, res) => {
  try {
    const { error } = DeletePreferedCollegeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { college_id } = req.body;
    const now = getCurrentTimestamp();
    await model.PreferedColleges.update(
      {
        deleted_at: now,
        deleted_by: checkUser.email,
      },
      {
        where: { id: college_id },
      }
    );
    res.json({
      success: true,
      message: "Prefered College deleted successfully",
    });
  } catch (error) {
    console.error("Error in DeletePreferedCollege:", error);
    loggers.error(error.message + " from DeletePreferedCollege function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const AddPreferedMajor = async (req, res) => {
  try {
    const { error } = AddPreferedMajorSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { major } = req.body;
    const preferedMajors = await model.PreferedMajors.create({
      name: major,
      user_id,
      created_by: checkUser.email,
    });
    res.json({
      success: true,
      message: "Prefered Major added successfully",
      data: { id: preferedMajors?.id, major: preferedMajors?.name },
    });
  } catch (error) {
    console.error("Error in AddPreferedMajor:", error);
    loggers.error(error.message + " from AddPreferedMajor function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const DeletePreferedMajor = async (req, res) => {
  try {
    const { error } = DeletePreferedMajorSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      loggers.error(
        "Validation error: " +
          error.details.map((err) => err.message).join(", ")
      );
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const user_id = req?.user?.id;
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }
    const { major_id } = req.body;
    const now = getCurrentTimestamp();
    await model.PreferedMajors.update(
      {
        deleted_at: now,
        deleted_by: checkUser.email,
      },
      {
        where: { id: major_id },
      }
    );
    res.json({
      success: true,
      message: "Prefered Major deleted successfully",
    });
  } catch (error) {
    console.error("Error in DeletePreferedMajor:", error);
    loggers.error(error.message + " from DeletePreferedMajor function");
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

export {
  createProfile,
  updatePersonalInfo,
  updateAccademicBackground,
  updateActTestScore,
  updateSatTestScore,
  updateToeflTestScore,
  updateIELTSTestScore,
  updateAPTestScore,
  getProfile,
  updateProfile,
  updateProfilePersonal,
  updateAdditionalInfo,
  AddExtracurriculars,
  DeleteExtracurriculars,
  AddPreferedCollege,
  DeletePreferedCollege,
  AddPreferedMajor,
  DeletePreferedMajor,
};
