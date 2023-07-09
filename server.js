import cookieParser from "cookie-parser";
import cors from "cors";
import dotevn from "dotenv";
import express from "express";
import helmet from "helmet";
import config from "./config.js";
import connectDB from "./db/db.js";
import User from "./model/user/user.schema.js";
import customer from "./model/user/customer.schema.js";
import Router from "./router/index.js";
import bcrypt from "bcrypt";
import product from "./model/user/product.schema.js";
import Order from "./model/user/order.schema.js";
import Category from "./model/user/category.schema.js";
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

  //  create a user router
  app.post("/create/user", async (req, res) => {
    bcrypt.genSalt(SaltRounds, function (_err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        if (!err) {
          const newUser = {
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: hash,
          };
          const user = new User(newUser);
          await user
            .save()
            .then((user) => {
              return res.status(201).json(user);
            })
            .catch((err) => {
              return res.status(500).json({ msg: "server error" });
            });
        } else {
          console.log(err);
          return res.status(400).json({ message: "There are problem" });
        }
      });
    });
  });

  // create customer router
  app.post("/create/customer", async (req, res) => {
    bcrypt.genSalt(SaltRounds, function (_err, salt) {
      bcrypt.hash(req.body.purchaseOrder, salt, async function (err, hash) {
        if (!err) {
          const newCustomer = {
            companyName: req.body.companyName,
            email: req.body.email,
            address: req.body.address,
            purchaseOrder: hash,
            userRef: req.body.userRef,
          };

          const Customer = new customer(newCustomer);
          await Customer.save()
            .then((customer) => {
              return res.status(201).json(customer);
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ msg: "server error" });
            });
        } else {
          console.log(err);
          return res.status(400).json({ message: "There are problem" });
        }
      });
    });
  });

  // create product router
  app.post("/create/product", async (req, res) => {
    const newProduct = {
      productName: req.body.productName,
      category: req.body.category,
      returnPeriod: req.body.returnPeriod,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      userRef: req.body.userRef,
      customerRef: req.body.customerRef,
    };
    const Product = new product(newProduct);
    await Product.save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "There are problem!" });
      });
  });

  // Create order router 
  app.post("/create/order", async (req, res) => {
    const body = req.body;
    const order = new Order({ ...body });
    await order.save()
      .then((order) => {
        res.status(201).json(order);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "There are problem!" });
      });
  });
 
  app.post("/create/category", async(req, res)=>{
    const body = req.body;
    const category = new Category({ ...body });
    await category.save()
      .then((category) => {
        res.status(201).json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "There are problem!" });
      });
  })

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
