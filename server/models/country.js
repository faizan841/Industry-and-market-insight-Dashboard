import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  country: String,
});

const CountryModel = mongoose.model("CountryModel", countrySchema);
export default CountryModel;
