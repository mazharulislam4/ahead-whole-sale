import { Router as router } from "express";
import { cCreateUser, cUpdateUser, cDeleteUser } from "../../../controller/userController/userController.js";

const  userRouter  =  router();

// create user 
userRouter.post('/create_user' , cCreateUser)
// update user 
userRouter.put("/update_user/:username", cUpdateUser)

// delete user 
userRouter.delete("/delete_user/:username", cDeleteUser)

export default  userRouter;