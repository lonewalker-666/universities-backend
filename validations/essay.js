import Joi from "joi";

const getEssayOneDataSchema = Joi.object({
    essayId: Joi.string().required(),
  });

  const createEssayDataSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string()
      .required()
      .custom((value, helpers) => {
        const htmlTagPattern = /<[^>]+>/;
        if (!htmlTagPattern.test(value)) {
          return helpers.message("Essay content must contain HTML tags.");
        }
        return value;
      })
  });


  const editEssayDataSchema = Joi.object({
    essayId: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string()
      .required()
      .custom((value, helpers) => {
        const htmlTagPattern = /<[^>]+>/;
        if (!htmlTagPattern.test(value)) {
          return helpers.message("Essay content must contain HTML tags.");
        }
        return value;
      })
  });

export {
    getEssayOneDataSchema,
    createEssayDataSchema,
    editEssayDataSchema,
}