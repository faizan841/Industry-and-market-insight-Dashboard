import mongoose from "mongoose";

const endSchema = new mongoose.Schema({
  end_year: Number,
  pestle: String,
});

const EndModel = mongoose.model("End", endSchema);

export default EndModel;
