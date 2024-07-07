const express = require("express");
const dataSchema = require("../db/schema");

const router = express.Router();


router.get("/", async(req, res)=>{
    
    try {
        const data = await dataSchema.find();
        return res.json(data);

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/totaldocuments", async(req, res)=>{
    
    try {
        const documents = await dataSchema.countDocuments();
        return res.json(documents);

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/country", async(req, res)=>{
    
    try {
        const data = await dataSchema.aggregate(
            [{
                $group: {
                    _id: '$country',
                    count: { $sum: 1 },
                },
            }]
        )
        return res.json({
            data : data
        });

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/region", async(req, res)=>{
    
    try {
        const data = await dataSchema.aggregate(
            [{
                $group: {
                    _id: '$region',
                    count: { $sum: 1 },
                },
            }]
        )
        return res.json({
            data : data
        });

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/published", async(req, res)=>{
    
    try {
        const data = await dataSchema.aggregate(
            [{
                $group: {
                    _id: { $substr: ['$published', 4, 3] }, 
                    count: { $sum: 1 },
                },
            }]
        )

        return res.json({
            data
        })

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/added", async(req, res)=>{
    try {
        
        const data = await dataSchema.aggregate(
            [{
                $group: {
                    _id: { $substr: ['$added', 4, 3] }, 
                    count: { $sum: 1 },
                },
            }]
        )

        return res.json({
            data
        })

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});

router.get("/topic", async(req, res)=>{
    
    try {
        const data = await dataSchema.aggregate(
            [{
                $group: {
                    _id: '$topic',
                    count: { $sum: 1 },
                },
            }]
        )
        return res.json({
            data : data
        });

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});


router.get('/intensity', async (req, res) => {
    try {
        const result = await dataSchema.aggregate([
            {
                $group: {
                    _id: {
                        year: { $substr: ['$added', 11, 4] },
                        month: { $substr: ['$added', 4, 3]  }
                    },
                    intensity: { $push: '$intensity' }
                }
            },
            {
                $sort: { '_id.year': 1,
                    '_id.month': 1 
                }
            }
        ]);

        const formattedResult = result.map(item => ({
            data: [{
                month: item._id.month,
                intensity: item.intensity
            }],
            year: item._id.year
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/relevancevslikelihood", async(req, res)=>{
    try {
        
        const relevance =  await dataSchema.aggregate([
            {
              $group: {
                _id: {
                  $substr: ['$added', 4, 3],
                },
                totalRelevance: {
                  $sum: '$relevance',
                },
              },
            },
        ]);

        const likelihood =  await dataSchema.aggregate([
            {
              $group: {
                _id: {
                  $substr: ['$added', 4, 3],
                },
                totalLikelihood: {
                  $sum: '$likelihood',
                },
              },
            },
        ]);

        return res.json({
            relevance,
            likelihood
        })

    } catch (error) {
        console.log(error);
        return res.json({success : false});
    }
});


module.exports = router;