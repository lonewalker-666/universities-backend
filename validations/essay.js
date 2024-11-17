import Joi from "joi";

const getEssayOneDataSchema = Joi.object({
    essayId: Joi.string().required(),
  });

  const createEssayDataSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string()
      .required()
      .custom((value, helpers) => {
        // Check for HTML tags
        const htmlTagPattern = /<[^>]+>/;
        if (!htmlTagPattern.test(value)) {
          return helpers.message("Essay content must contain HTML tags.");
        }
        
        // Check that non-whitespace text is placed inside tags
        const contentInsideTagsPattern = /<[^>]+>\s*([^<>\s]+)\s*<\/[^>]+>/;
        if (!contentInsideTagsPattern.test(value)) {
          return helpers.message("Essays should not be empty.");
        }
  
        return value;
      })
  });
  

  const editEssayDataSchema = Joi.object({
    essayId: Joi.string().required().messages({
      "string.base": "Essay id is required",
    }),
    title: Joi.string().required(),
    content: Joi.string()
      .required()
      .custom((value, helpers) => {
        // Check for HTML tags
        const htmlTagPattern = /<[^>]+>/;
        if (!htmlTagPattern.test(value)) {
          return helpers.message("Essay content must contain HTML tags.");
        }
        
        // Check that non-whitespace text is placed inside tags
        const contentInsideTagsPattern = /<[^>]+>\s*([^<>\s]+)\s*<\/[^>]+>/;
        if (!contentInsideTagsPattern.test(value)) {
          return helpers.message("Essays should not be empty.");
        }
  
        return value;
      })
  });

  const deleteEssayDataSchema = Joi.object({
    essayId: Joi.string().required().messages({
      "string.base": "Essay id is required",
    }),
  });

export {
    getEssayOneDataSchema,
    createEssayDataSchema,
    editEssayDataSchema,
    deleteEssayDataSchema
}