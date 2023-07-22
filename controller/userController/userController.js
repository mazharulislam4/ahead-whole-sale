import {
  createUserService,
  updateUserService,
  deleteUserService,
  findSingleUserService,
  findAllUserService,
} from "../../service/userService/userS.js";
import User from "../../model/user/user.schema.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

// create user
export const cCreateUser = async (req, res, _next) => {
  try {
    const { username, email, phone, role, password, fullName } = req.body;
    //  payload validation
    if (!username || !phone || !password || !fullName || !email) {
      return res
        .status(400)
        .json({ data: null, error: { message: "invalid cadentials" } });
    }

    // user validation
    const findUser = await User.find({ username: username });
    if (findUser.length >= 1) {
      return res.status(400).json({
        data: null,
        error: { message: `username already account created` },
      });
    }

    // password hashing function
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ data: null, error: { message: "invalid password!" } });
      }
      // if payload pass validation create a user in user schema
      const user = await createUserService({
        username,
        email,
        password: hash,
        phone,
        fullName,
        role,
      });
      // if database faild to create user then retrun errror
      if (!user) {
        return res
          .status(500)
          .json({ data: null, error: { message: "server error" } });
      }
      // delete passwor from the user response
      delete user._doc.password;
      // return  response data
      return res.status(200).json({
        data: user,
        error: null,
        message: "user created successfully!",
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error" } });
  }
};

// update user

export const cUpdateUser = async (req, res, _next) => {
  try {
    // username find by params
    const username = req.params.username;

    const { email, phone, fullName } = req.body;
    if (!req.body) {
      return res.status(500).json({
        data: null,
        error: { message: "Data to update can not be empty" },
      });
    }
    // if payload pass validation
    const user = await updateUserService({
      username,
      email,
      phone,
      fullName,
    });

    // if database faild to update user then retrun errror
    if (!user) {
      return res
        .status(500)
        .json({ data: null, error: { message: "server error" } });
    }
    //  return response data
    return res.status(200).json({
      data: user,
      error: null,
      message: "user created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// delete user

export const cDeleteUser = async (req, res, _next) => {
  try {
    const username = req.params.username;

    // username empty validation
    if (!username) {
      return res
        .status(400)
        .json({ data: null, error: { message: "username is empty" } });
    }
    // if payload pass validation
    const user = await deleteUserService({ username });
    // if database faild to update user then retrun errror
    if (!user) {
      return res
        .status(400)
        .json({ data: null, error: { message: "username is not valid !" } });
    }
    //  return response data
    return res
      .status(200)
      .json({ data: user, error: null, message: "user deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};

// find single user controller
export const findSingleUserC = async (req, res, _next) => {
  try {
    const username = req.params.username;

    // username empty validation
    if (!username) {
      return res
        .status(400)
        .json({ data: null, error: { message: "username is empty" } });
    }
    // if payload pass validation
    const user = await findSingleUserService({ username });
    // if database faild to find single user then retrun errror
    if (!user) {
      return res
        .status(400)
        .json({ data: null, error: { message: "username is not valid !" } });
    }
    //  return response data
    return res
      .status(200)
      .json({ data: user, error: null, message: "user find successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};


// find all user controller 
export const findAllUserC = async (req, res, _next) => {
  try {
    const AllUser = await findAllUserService();

    // if database faild to find  user then retrun errror
    if (!AllUser) {
      return res
        .status(400)
        .json({
          data: null,
          error: { message: "There are problem for find user" },
        });
    }
    //  return response data
    return res
      .status(200)
      .json({
        data: AllUser,
        error: null,
        message: "All user find successfully!",
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, error: { message: "server error !!!" } });
  }
};
