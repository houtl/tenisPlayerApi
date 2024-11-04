import { Db } from "mongodb";
import { Statistics } from "../types/statistics";
import { PlayerDB } from "../types/player";

export const getGlobalStatistics = async (db: Db): Promise<Statistics> => {

    const collection = db.collection<PlayerDB>("players");

    const winRatio = await collection
        .aggregate([
            {
                $group: {
                    _id: "$country.code",
                    totalWins: {
                        $sum: {
                            $size: {
                                $filter: {
                                    input: "$data.last",
                                    as: "result",
                                    cond: { $eq: ["$$result", 1] },
                                },
                            },
                        },
                    },
                    totalMatches: { $sum: { $size: "$data.last" } },
                },
            },
            {
                $addFields: {
                    winRatio: { $divide: ["$totalWins", "$totalMatches"] },
                },
            },
            {
                $sort: { winRatio: -1 },
            },
            {
                $project: {
                    winRatio: 1,
                },
            },
            { $limit: 1 },
        ])
        .toArray();

    const heightAndBMI = await collection
        .aggregate([
            {
                $group: {
                    _id: 0,
                    playerBMIs: { $push: { $divide: ["$data.weight", { $pow: ["$data.height", 2] }] } },
                    medianHeight: {
                        $median: {
                            input: "$data.height",
                            method: "approximate",
                        },
                    },
                },
            },
            {
                $addFields: {
                    averageBMI: { $multiply: [{ $avg: "$playerBMIs" }, 10] },
                },
            },
            {
                $project: {
                    averageBMI: 1,
                    medianHeight: 1,
                },
            },
        ])
        .toArray();

    return {
        bestCountry: winRatio[0]._id,
        bestCountryWinRatio: winRatio[0].winRatio,
        medianHeight: heightAndBMI[0].medianHeight,
        averageBMI: heightAndBMI[0].averageBMI,
    };
};
