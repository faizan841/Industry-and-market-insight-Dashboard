import express from "express";
import allCountries, {
  getDashboardData,
  topCountriesWithInsights,
  topTitlesWithLikelihood,
} from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const countries = await allCountries;
    const countryCount = countries.length;

    const dashboardData = await getDashboardData();
    const topInsightsByCountry = await topCountriesWithInsights();
    const topTitles = await topTitlesWithLikelihood();

    res.json({
      countryCount,
      ...dashboardData,
      topInsightsByCountry,
      topTitles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

export default router;
