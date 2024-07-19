import mongoose from "mongoose";

const likelihoodSchema = new mongoose.Schema({
  likelihood: Number,
  title: String,
  url: String,
  country: String,
  sector: String,
});

const LikelihoodModel = mongoose.model("Likelihood", likelihoodSchema);

export default LikelihoodModel;
