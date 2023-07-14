import { response } from "express";
import { createUserService } from "../../service/userService/userS.js";

export const  cCreateUser = async ( req , res , next)=>{
    try{
    
const {username , email , phone , role , password  , fullName} = req.body ;
//  payload validation 
if(!username || !phone || !password || !fullName || !email){
    return res.status(400).json({data: null,  error: {message: 'invalid cadentials'}})
}
// if payload pass validation create a user in user schema 
const user = await createUserService({username , email , password ,phone, fullName , role});
// if database faild to create user then retrun errror 
if(!user){
    return res.status(500).json({data: null,  error: {message: 'server error'}});
}
// delete passwor from the user response
delete user._doc.password;
// return  response data 
return res.status(500).json({data: user,  error: null, message: 'user created successfully!'});

    }catch(err){
        console.log(err);
    }
}