import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import likelihoodRoutes from "./routes/likelihood.js";
import geolocationRoutes from "./routes/geolocation.js";
import topicsRoutes from "./routes/topics.js";
import endRoutes from "./routes/end.js";
import dashboardRoutes from "./routes/dashboard.js";

//model and data imports

import LikelihoodModel from "./models/likelihood.js";
import fs from "fs";
import CountryModel from "./models/country.js";
import InsightModel from "./models/insights.js";
import TopicsModel from "./models/topics.js";
import EndModel from "./models/end.js";

const data = fs.readFileSync("./data/jsondata.json", "utf8");
const jsonData = JSON.parse(data);

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/likelihood", likelihoodRoutes);
app.use("/topics", topicsRoutes);
app.use("/country", geolocationRoutes);
app.use("/year", endRoutes);
app.use("/dashboard", dashboardRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //InsightModel.insertMany(jsonData);
    //IntensityModel.insertMany(jsonData);
    //LikelihoodModel.insertMany(jsonData);
    //CountryModel.insertMany(jsonData);
    //TopicsModel.insertMany(jsonData);
    //EndModel.insertMany(jsonData);
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
