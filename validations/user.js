import Joi from "joi";


const createProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.string().required(),
  gender_id: Joi.number().required(),
  profileEmojiId: Joi.number().required().default(1),
  mobile: Joi.string().required().min(10).max(17),
  location: Joi.string().required(),
});

const updatePersonalInfoSchema = Joi.object({
  race_id: Joi.number().required(),
  armed_force_status_id: Joi.number().required(),
  first_generation_id: Joi.number().required(),
  citizenship_id: Joi.number().required(),
  about: Joi.string().required().max(1000),
});

const updateAccademicBackgroundSchema = Joi.object({
  high_school_id: Joi.number().required(),
  grade_level_id: Joi.number().required(),
  college_start_date: Joi.string().required(),
  graduation_date: Joi.string().required(),
  gpa: Joi.number().required(),
  class_rank: Joi.string(),
});

const updateActTestScoreSchema = Joi.array()
  .items(
    Joi.object({
      subject_id: Joi.number()
        .integer()
        .valid(1, 2, 3, 4, 5) // Validates that id is in validSubjectIds array
        .required()
        .messages({
          "any.only": "Invalid subject id",
          "number.base": "Subject id must be a number",
        }),
      score: Joi.number()
        .integer()
        .min(0)
        .max(36) // Score limit validation
        .required()
        .messages({
          "number.base": "Score must be a number",
          "number.min": "Score cannot be less than 0",
          "number.max": "Score cannot be more than 36",
        }),
    })
  )
  .custom((value, helpers) => {
    const requiredIds = [1, 2, 3, 4, 5];
    const providedIds = value.map(item => item.subject_id);
    // Check if all required IDs are present
    const missingIds = requiredIds.filter(id => !providedIds.includes(id));
    if (missingIds.length > 0) {
      return helpers.message(`Missing required subject_id(s): ${missingIds.join(", ")}`);
    }

    return value; // If validation passed, return the validated value
  });

const updateSatTestScoreSchema = Joi.array()  
  .items(
    Joi.object({
      subject_id: Joi.number()
        .integer()
        .valid(6, 7) // Validates that id is in validSubjectIds array
        .required()
        .messages({
          "any.only": "Invalid subject id",
          "number.base": "Subject id must be a number",
        }),
      score: Joi.number()
        .integer()
        .min(0)
        .max(800) // Score limit validation
        .required()
        .messages({
          "number.base": "Score must be a number",
          "number.min": "Score cannot be less than 0",
          "number.max": "Score cannot be more than 800",
        }),
    })
  )
  .custom((value, helpers) => {
    const requiredIds = [6,7];
    const providedIds = value.map(item => item.subject_id);

    // Check if all required IDs are present
    const missingIds = requiredIds.filter(id => !providedIds.includes(id));
    if (missingIds.length > 0) {
      return helpers.message(`Missing required subject_id(s): ${missingIds.join(", ")}`);
    }

    return value; // If validation passed, return the validated value
  });

const updateTOEFLTestScoreSchema = Joi.array()
  .items(
    Joi.object({
      subject_id: Joi.number()
        .integer()
        .valid(46, 47, 48, 49) // Validates that id is in validSubjectIds array
        .required()
        .messages({
          "any.only": "Invalid subject id",
          "number.base": "Subject id must be a number",
        }),
      score: Joi.number()
        .integer()
        .min(0)
        .max(30) // Score limit validation
        .required()
        .messages({
          "number.base": "Score must be a number",
          "number.min": "Score cannot be less than 0",
          "number.max": "Score cannot be more than 30",
        }),
    })
  )
  .custom((value, helpers) => {
    const requiredIds = [46,47,48,49];
    const providedIds = value.map(item => item.subject_id);

    // Check if all required IDs are present
    const missingIds = requiredIds.filter(id => !providedIds.includes(id));
    if (missingIds.length > 0) {
      return helpers.message(`Missing required subject_id(s): ${missingIds.join(", ")}`);
    }

    return value; // If validation passed, return the validated value
  });

  const updateIELTSTestScoreSchema = Joi.array()
  .items(
    Joi.object({
      subject_id: Joi.number()
        .integer()
        .valid(50,51,52,53) // Validates that id is in validSubjectIds array
        .required()
        .messages({
          "any.only": "Invalid subject id",
          "number.base": "Subject id must be a number",
        }),
      score: Joi.number()
        .integer()
        .min(0)
        .max(9) // Score limit validation
        .required()
        .messages({
          "number.base": "Score must be a number",
          "number.min": "Score cannot be less than 0",
          "number.max": "Score cannot be more than 9",
        }),
    })
  )
  .custom((value, helpers) => {
    const requiredIds = [50,51,52,53];
    const providedIds = value.map(item => item.subject_id);

    // Check if all required IDs are present
    const missingIds = requiredIds.filter(id => !providedIds.includes(id));
    if (missingIds.length > 0) {
      return helpers.message(`Missing required subject_id(s): ${missingIds.join(", ")}`);
    }

    return value; // If validation passed, return the validated value
  });

const updateAPTestScoreSchema = Joi.object({
  subject_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Subject id is required",
    }),
  score: Joi.number()
    .integer()
    .min(0)
    .max(5) // Score limit validation
    .required()
    .messages({
      "number.base": "Score must be a number",
      "number.min": "Score cannot be less than 0",
      "number.max": "Score cannot be more than 5",
    }),
})

 const updateProfileSchema = Joi.object({
  profileEmojiId: Joi.number().required().default(1),
  mobile: Joi.string().required().min(10).max(17),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  // dob: Joi.string().required(),
  location: Joi.string().required(),
  // about: Joi.string().required().max(1000),
});

 const updateProfilePersonalSchema = Joi.object({
  race_id: Joi.number().required(),
  armed_force_status_id: Joi.number().required(),
  first_generation_id: Joi.number().required(),
  citizenship_id: Joi.number().required(),
  gender_id: Joi.number().required(),
  financial_aid_id: Joi.number().required(),
})

 const updateAdditionalInfoSchema = Joi.object({
  houseHeld: Joi.number().required(),
  physical_disability: Joi.boolean().required(),
  additionalInfo: Joi.string().required().max(1000),
})

const AddExtracurricularsSchema = Joi.object({
  activity: Joi.string().required().max(1000),
})

const DeleteExtracurricularsSchema = Joi.object({
  activity_id: Joi.number().required(),
})

const AddPreferedCollegeSchema = Joi.object({
  college: Joi.string().required(),
})

const DeletePreferedCollegeSchema = Joi.object({
  college_id: Joi.number().required(),
})

const AddPreferedMajorSchema = Joi.object({
  major: Joi.string().required(),
})

const DeletePreferedMajorSchema = Joi.object({
  major_id: Joi.number().required(),
})

export {
  createProfileSchema,
  updatePersonalInfoSchema,
  updateAccademicBackgroundSchema,
  updateActTestScoreSchema,
  updateSatTestScoreSchema,
  updateTOEFLTestScoreSchema,
  updateIELTSTestScoreSchema,
  updateAPTestScoreSchema,
  updateProfileSchema,
  updateProfilePersonalSchema,
  updateAdditionalInfoSchema,
  AddExtracurricularsSchema,
  DeleteExtracurricularsSchema,
  AddPreferedCollegeSchema,
  DeletePreferedCollegeSchema,
  AddPreferedMajorSchema,
  DeletePreferedMajorSchema
};
