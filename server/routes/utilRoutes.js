import express from "express";
import User from "../models/userModel.js";
import HireRequest from "../models/hireRequestModel.js";
import mongoose from "mongoose";

const router = express.Router();

//route to test indexes
//services index
//http://localhost:9120/api/v1/util
router.route("/").get(async (req, res) => {
    //get users
    await User.aggregate([
        {
            $match: {
                //services: {$exists: true},
                //firstName: "Dekomori",
                'services.petTypes': {$in: ["Dogs", "Cats"]},
            },
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                services: 1,
            },
        },
    ])
        .hint({ _id: 1, firstName: 1, lastName: 1, services: 1 })
        .explain()
        .then((users) => res.json(users))
        .catch((err) => res.json("Error: " + err));
});

//get hire requests made by user
router.route("/hire/:id").get(async (req, res) => {
    const hireRequests = await HireRequest.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.params.id),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "serviceProvider",
                foreignField: "_id",
                as: "serviceProvider",
            }
        },{
            $unwind: "$serviceProvider",
        },
        {
            $project: {
                _id: 1,
                status: 1,
                startDate: 1,
                endDate: 1,
                startTime: 1,
                endTime: 1,
                oneDay: 1,
                //totalFee: 1,
                serviceProvider: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    profilePic: 1,
                },
            },
        }
    ])
    .explain()
    .then((users) => res.json(users))
});

export default router;