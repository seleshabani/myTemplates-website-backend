require('dotenv').config();
const { logger_log } = require("../logger");

const paginate = (model)=>{
    return async (req,res,next)=>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIdx = (page - 1) * limit;
        const endIdx = page * limit;

        const results = {};

        if (endIdx < await model.countDocuments().exec()) {
            results.next = {
                page : page +1,
                limit:limit
            }
        }

        if (startIdx > 0) {
            results.previous = {
                page:page -1,
                limit:limit
            }
        }

        try {
            results.results = await model.find().limit(limit).skip(startIdx).exec();
            res.paginatedResults = results;
            next();
        } catch (error) {
            logger_log('pagination',error);
            res.append(process.env.cors_header,process.env.authorized_cors_url).status(500).json('erreur serveur pendant la pagination');
        }

    }
}
module.exports = {paginate}