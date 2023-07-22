import { Router as router } from "express";
import {
  cCreateUser,
  cUpdateUser,
  cDeleteUser,
  findSingleUserC,
  findAllUserC,
} from "../../../controller/userController/userController.js";

const userRouter = router();

// create user
userRouter.post("/create_user", cCreateUser);
// update user
userRouter.put("/update_user/:username", cUpdateUser);

// delete user
userRouter.delete("/delete_user/:username", cDeleteUser);

// find single user

userRouter.get("/find_user/:username", findSingleUserC);

// find all user
userRouter.get("/find_all_user", findAllUserC);

export default userRouter;
