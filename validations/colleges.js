import Joi from "joi";

const getCollegesSchema = Joi.object({
    offset: Joi.number().default(0),
    limit: Joi.number().default(50).max(100),
    sortBy: Joi.string().default("name").valid("name","city","cost"),
    sortOrder: Joi.string().default("asc").valid("asc","desc"),
});

const getCollegeOneSchema = Joi.object({
    id: Joi.number().required(),
  });
const AddToWishlistSchema = Joi.object({
    college_id: Joi.number().required(),
    college_name: Joi.string().required(),
    city_state: Joi.string().required(),
})
export { getCollegesSchema,getCollegeOneSchema,AddToWishlistSchema };