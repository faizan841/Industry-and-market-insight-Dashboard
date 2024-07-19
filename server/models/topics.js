import mongoose from "mongoose";

const topicsSchema = new mongoose.Schema({
  sector: String,
  topic: String,
  region: String,
  country: String,
  pestle: String,
  relevance: Number,
});

const TopicsModel = mongoose.model("Topics", topicsSchema);

export default TopicsModel;
