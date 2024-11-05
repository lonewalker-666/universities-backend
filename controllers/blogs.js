import model from "../models/index.js";
import loggers from "../config/logger.js";
import { getBlogDataSchema } from "../validations/blogs.js";

const getAllBlogs = async (req, res) => {
    try {
        // Step 1: Fetch all blogs with basic attributes and category
        const blogs = await model.Blogs.findAll({
            attributes: ['id', 'uuid', 'name', 'created_at', 'blog_category_id', 'file_name', 'folder', 'file_url'],
            order: [['id', 'DESC']],
            include: [{
                model: model.BlogCategory,
                attributes: ['id', 'name'],
            }]
        });

        // Step 2: For each blog, fetch one overview paragraph and its highlights
        const blogsWithParaAndHighlights = await Promise.all(blogs.map(async (blog) => {
            // Fetch the first overview paragraph for the current blog
            const overviewPara = await model.BlogsOverviewPara.findOne({
                where: { blog_id: blog.id },
                attributes: ['id', 'blog_id', 'paragraph', 'para_order'],
                order: [['para_order', 'ASC']], // Get the first paragraph
                include: [{
                    model: model.BlogsOverviewHighlighted,
                    as: 'overviewHighlights', // This should match the association alias
                    attributes: ['highlighted_text', 'url'],
                    order: [['id', 'ASC']],
                }]
            });

            return {
                ...blog.toJSON(),
                overviewPara: overviewPara || null // Add the paragraph details
            };
        }));

        return res.json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogsWithParaAndHighlights
        });
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        loggers.error(error.message + " from getAllBlogs function");

        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const getBlogData = async (req, res) => {
    try {
        const { error } = getBlogDataSchema.validate(req.params, { abortEarly: false });
        if (error) {
          loggers.error(
            "Validation error: " +
              error.details.map((err) => err.message).join(", ")
          );
          return res.json({
            success: false,
            message: error.details[0].message,
          });
        }
        const blog = await model.Blogs.findOne({
            where: { uuid: req.params.uuid },
            attributes: ['id', 'uuid', 'name', 'created_at', 'blog_category_id', 'file_name', 'folder', 'file_url'],
            include: [{
                model: model.BlogCategory,
                attributes: ['id', 'name'],
            },{
                model: model.BlogsOverviewPara,
                as:"overviewParas",
                attributes: ['id', 'blog_id', 'paragraph', 'para_order'],
                order: [['para_order', 'ASC']],
                include: [{
                    model: model.BlogsOverviewHighlighted,
                    as: 'overviewHighlights', // This should match the association alias
                    attributes: ['highlighted_text', 'url'],
                    order: [['id', 'ASC']],
                }]
            },{
                model:model.BlogsTopic,
                as:"topics",
                attributes: ['id', 'blog_id', 'title'],
                order: [['id', 'ASC']],
                include: [{
                    model:model.BlogsContentPara,
                    as:"contentParas",
                    attributes: ['id', 'blog_topic_id', 'paragraph', 'para_order'],
                    order: [['para_order', 'ASC']],
                    include: [{
                        model: model.BlogsContentHighlighted,
                        as: 'contentHighlights', // This should match the association alias
                        attributes: ['highlighted_text', 'url'],
                        order: [['id', 'ASC']],
                    }]
                }]
            }]
        });
        if(!blog){
            return res.json({
                success: false,
                message: "Blog not found",
            });
        }
        return res.json({
            success: true,
            message: "Blogs fetched successfully",
            data: blog
        });
    }catch (error) {
        console.error("Error in getAllBlogs:", error);
        loggers.error(error.message + " from getAllBlogs function");

        return res.json({
            success: false,
            message: error.message,
        });
    }
}

export {
    getAllBlogs,
    getBlogData
};
