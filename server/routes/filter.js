const express = require("express");
const dataSchema = require("../db/schema");

const router = express.Router();

router.get("/", async(req, res)=>{
    try {

        const query = req.query;
        const page = Number.parseInt(query.page);

        const queries = {}

        if (query.filter && query.query){
            if (query.filter === "end_year") {

                queries[query.filter] = Number.parseInt(query.query);
                const data = await dataSchema
                    .find(queries)
                    .skip((page - 1) * 10)
                    .limit(10);
                return res.json(data);

            } else {
                const filter = query.filter;
                const search = query.query;

                const data = await dataSchema
                    .find({ [filter]: { $regex: new RegExp(search, 'i') } })
                    .skip((page - 1) * 10)
                    .limit(10);
                return res.json(data);
            }
        }

        const data = await dataSchema
            .find()
            .skip((page - 1) * 10)
            .limit(10);
        return res.json(data);

    } catch (error) {
        return res.json([]);
    }
})

module.exports = router;