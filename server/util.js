import CountryModel from "./models/country.js";
import InsightModel from "./models/insights.js";
import { countryToAlpha3 } from "country-to-iso";
import TopicsModel from "./models/topics.js";
import LikelihoodModel from "./models/likelihood.js";

/////////////////////////////////////////////////////////////////
const getDashboardData = async () => {
  try {
    const data = await TopicsModel.aggregate([
      {
        $group: {
          _id: null,
          uniquePestle: { $addToSet: { $ifNull: ["$pestle", "Unknown"] } },
          uniqueRegions: { $addToSet: "$region" },
          uniqueSectors: { $addToSet: "$sector" },
          uniqueTopics: { $addToSet: "$topic" },
        },
      },
      {
        $project: {
          _id: 0,
          totalPestle: { $size: "$uniquePestle" },
          pestleNames: {
            $filter: {
              input: "$uniquePestle",
              as: "pestle",
              cond: { $ne: ["$$pestle", ""] },
            },
          },
          totalUniqueRegions: { $size: "$uniqueRegions" },
          totalUniqueSectors: { $size: "$uniqueSectors" },
          totalUniqueTopics: { $size: "$uniqueTopics" },
        },
      },
    ]);

    const result = data[0];
    return {
      totalPestle: result.totalPestle,
      pestleNames: result.pestleNames,
      totalUniqueRegions: result.totalUniqueRegions,
      totalUniqueSectors: result.totalUniqueSectors,
      totalUniqueTopics: result.totalUniqueTopics,
    };
  } catch (err) {
    console.error(err);
    return {};
  }
};

////////////////////////////////////////////////////////////////////////////////////
const allCountries = CountryModel.distinct("country")
  .then((countries) => {
    return countries;
  })
  .catch((err) => {
    console.error(err);
  });

/////////////////////////////////////////////////////////////////////////////////////
const allInsights = InsightModel.aggregate([
  {
    $group: {
      _id: "$country",
      insights: { $push: "$insight" },
    },
  },
])
  .then((result) => {
    return result.map((doc) => ({
      id: countryToAlpha3(doc._id),
      value: doc.insights.length,
    }));
  })
  .catch((err) => {
    console.error(err);
  });

///////////////////////////////////////////////////////////////////////////////////////
const topCountriesWithInsights = async () => {
  try {
    const result = await InsightModel.aggregate([
      {
        $match: { country: { $ne: "" } }, // filter out documents with empty country field
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          insightCount: "$count",
        },
      },
    ]);

    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const topTitlesWithLikelihood = async () => {
  try {
    const result = await LikelihoodModel.aggregate([
      {
        $group: {
          _id: "$title",
          likelihood: { $max: "$likelihood" },
          country: { $first: "$country" },
          sector: { $first: "$sector" },
          url: { $first: "$url" },
        },
      },
      {
        $sort: { likelihood: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          title: "$_id",
          likelihood: 1,
          country: 1,
          sector: 1,
          url: 1,
        },
      },
    ]);

    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export {
  allCountries as default,
  allInsights,
  getDashboardData,
  topCountriesWithInsights,
  topTitlesWithLikelihood,
};
