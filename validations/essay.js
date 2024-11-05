import Joi from "joi";

const getEssayOneDataSchema = Joi.object({
    essayId: Joi.string().required(),
  });

export {
    getEssayOneDataSchema
}