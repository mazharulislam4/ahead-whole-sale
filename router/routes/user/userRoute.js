import { Router as router } from "express";
import { cCreateUser } from "../../../controller/userController/userController.js";

const  userRouter  =  router();

// create user 
userRouter.post('/create_user' , cCreateUser)
// update user 


// delete user 


export default  userRouter;