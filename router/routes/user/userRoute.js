import { Router as router } from "express";

const  userRouter  =  router();

// create user 
userRouter.get('/create_user' ,  (req, res , next)=>{
res.send({msg:'from user route'})
}  )
// update user 


// delete user 


export default  userRouter;