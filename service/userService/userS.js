import User from "../../model/user/user.schema.js";

export const  createUserService = async (payload)=>{
    const {username , email , phone , role , fullName , password} = payload;

    const  newUser =  new  User({username , email , phone
    , role , fullName , password});

   return await newUser.save()

    // create user in database 
}