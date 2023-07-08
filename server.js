import cookieParser from "cookie-parser";
import cors from "cors";
import dotevn from "dotenv";
import express from "express";
import helmet from "helmet";
import config from "./config.js";
import connectDB from "./db/db.js";
import User from "./model/user/user.schema.js";
import Router from "./router/index.js";

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

  app.post("/", async (req, res) => {
    const body = req.body;

    try {
      let user;
      const newUser = new User({ ...body });
      user = await newUser.save();

      console.log(user);
      if (!user) return res.status(404).json({ msg: "not found" });

      return res.status(200).json({ error: null, msg: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "server error" });
    }
  });

  app.use(Router);

  // error handler

  // set engine
  // app.set('view engine' ,'ejs')

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
