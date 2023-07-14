import { Router as router } from "express";
import userRouter from "./routes/user/userRoute.js";
import authRouter from "./routes/auth/authUser.js";

const  Router  =  router();

// auth 
Router.use( '/api/v1/auth' ,  authRouter)
// user 
Router.use( '/api/v1/user', userRouter)

export default Router;