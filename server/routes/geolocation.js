import express from "express";
import { allInsights } from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const insightAndISO = await allInsights;
  console.log(insightAndISO);
  res.status(200).json(insightAndISO);
});

export default router;
