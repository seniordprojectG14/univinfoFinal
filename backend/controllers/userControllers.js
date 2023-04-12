// const asyncHandler = require("express-async-handler");
import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
// const User = require("../models/userModel");
import generateToken from '../config/generateToken.js';
// const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password, pic } = req.body;

  if (!name || !username || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});



//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or Password");
  }
});


const resetPassword = asyncHandler(async (req, res) => {
  const { username} = req.body;
  // await user.matchPassword(password)
  const user = await User.findOne({ username });
  console.log(JSON.stringify(user) + "user");
//   const newPassword = req.body.newPassword
//   console.log(JSON.stringify(user.password) + "password")
//   console.log(JSON.stringify(newPassword) + "password")
//   if (user) {
//   const updatedPost = await User.findByIdAndUpdate(user._id, { password: newPassword }, { new: true });
//   res.json(updatedPost);
//   } else {
//     res.status(401);
//     throw new Error("Invalid username or Password");
//   }
 });





//post.postListLikeUsernames = arrayWithout(username, postListLikeUsernames);



export {allUsers, registerUser, authUser, resetPassword};
// module.exports = { allUsers, registerUser, authUser };
