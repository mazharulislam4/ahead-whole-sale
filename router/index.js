import { Router as router } from "express";
import userRouter from "./routes/user/userRoute.js";
import authRouter from "./routes/auth/authUser.js";
import customerRouter from "./routes/customer/customerRoute.js";
import productRouter from "./routes/product/productRoute.js";
import order from "./routes/order/orderRouter.js";
import category from "./routes/category/categoryRouter.js";

const Router = router();

// auth
Router.use("/api/v1/auth", authRouter);
// user
Router.use("/api/v1/user", userRouter);
// customer
Router.use("/api/v1/customer", customerRouter);
// product
Router.use("/api/v1/product", productRouter);

// order
Router.use("/api/v1/order", order);

// category
Router.use("/api/v1/category", category);

export default Router;
