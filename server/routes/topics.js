import express from "express";
import TopicsModel from "../models/topics.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //sort should look like this: {"field": "userId", "sort": "descending"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //formatted sort should look like this {userId: -1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const topics = await TopicsModel.find({
      $or: [
        { sector: { $regex: new RegExp(search, "i") } },
        { topic: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await TopicsModel.countDocuments({
      topic: { $regex: search, $options: "i" },
    });
    console.group(topics);
    res.status(200).json({
      topics,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
