import Joi from "joi";

const getBlogDataSchema = Joi.object({
    uuid: Joi.string().required(),
  });

export {
    getBlogDataSchema
}