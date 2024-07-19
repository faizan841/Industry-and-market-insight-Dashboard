import express from "express";
import LikelihoodModel from "../models/likelihood.js";
import allCountries from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const countries = await allCountries;
  const likelihoodData = await LikelihoodModel.aggregate([
    { $sample: { size: 20 } }, // get 20 random documents
  ]);
  res.status(200).json({ countries, likelihoodData });
});

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const likelihoodData = await LikelihoodModel.find({
      likelihood: data.likelihood,
      country: data.country,
    });
    if (likelihoodData.length === 0) {
      res.status(404).send({ message: "No likelihood data found" });
    } else {
      res.send(likelihoodData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving likelihood data" });
  }
});

export default router;
