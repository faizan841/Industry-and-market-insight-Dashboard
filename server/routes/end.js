import express from "express";
import EndModel from "../models/end.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const endYear = req.query.endYear;
  console.log(endYear);
  try {
    const data = await EndModel.find({ end_year: endYear });

    const pieChartData = {};
    for (const item of data) {
      const { pestle } = item;
      if (pieChartData[pestle]) {
        pieChartData[pestle] += 1;
      } else {
        pieChartData[pestle] = 1;
      }
    }

    const result = Object.keys(pieChartData).map((key) => ({
      id: key,
      label: key,
      value: pieChartData[key],
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;
