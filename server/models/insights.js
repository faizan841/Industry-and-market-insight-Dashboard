import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  country: String,
  insight: String,
});

const InsightModel = mongoose.model("InsightModel", insightSchema);

export default InsightModel;
