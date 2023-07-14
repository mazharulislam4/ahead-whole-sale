import cookieParser from "cookie-parser";
import cors from "cors";
import dotevn from "dotenv";
import express from "express";
import helmet from "helmet";
import config from "./config.js";
import connectDB from "./db/db.js";
import Router from "./router/index.js";


const SaltRounds = 10;

// main
const main = () => {
  dotevn.config();
  const app = express();
  app.use(helmet());

  // parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(config.cookie.key));
  app.use(cors());
  // routes
  app.get("/", (req, res) => {
    res.json({ x: "hello" });
  });

  app.use(Router);

  
  // set engine
  // app.set('view engine' ,'ejs')

  // error handler

  // DB connect
  connectDB(`${config.db.url}/whole_sale`)
    .then(() => {
      console.log("DB is connected!");
      // server

      app.listen(config.app.port, () => {
        console.log(`server is running on ${config.app.port} port`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
