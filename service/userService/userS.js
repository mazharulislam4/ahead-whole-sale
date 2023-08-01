import User from "../../model/user/user.schema.js";

// create user
export const createUserService = async (payload) => {
  const { username, email, phone, role, fullName, password } = payload;

  const newUser = new User({
    username,
    email,
    phone,
    role,
    fullName,
    password,
  });

  return await newUser.save();

  // create user in database
};

// update user
export const updateUserService = async (payload) => {
  const { username, email, phone, fullName } = payload;
  const updateUser = {
    email,
    phone,
    fullName,
  };

  return await User.findOneAndUpdate({ username: username }, updateUser, {
    new: true,
  });
};

// delete user
export const deleteUserService = async (payload) => {
  const { username } = payload;
  return await User.findOneAndDelete({ username: username });
};

// find single user
export const findSingleUserService = async (payload) => {
  const { username } = payload;

  return await User.find({ username: username });
};

// find all user

export const findAllUserService = async () => {
  return await User.find();
};
