import { Router as router } from "express";
import userRouter from "./routes/user/userRoute.js";
import authRouter from "./routes/auth/authUser.js";
import customerRouter from "./routes/customer/customerRoute.js";
import productRouter from './routes/product/productRoute.js'

const  Router  =  router();

// auth 
Router.use( '/api/v1/auth' ,  authRouter)
// user 
Router.use( '/api/v1/user', userRouter)
// customer 
Router.use("/api/v1/customer", customerRouter)
// product 
Router.use('/api/v1/product', productRouter)


export default Router;