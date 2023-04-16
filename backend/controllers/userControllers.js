// const asyncHandler = require("express-async-handler");
import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
// const User = require("../models/userModel");
import generateToken from '../config/generateToken.js';
import crypto from 'crypto'
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
  console.log("before b64 decode\n")
  console.log(password)
  //const encPass = Buffer.from(password, 'base64');
  // stored privkey 
  const privKey = "-----BEGIN PRIVATE KEY-----\n"+
  "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\n"+
  "biP3dhkPuQVq1LgLo87+QJ/6beIRRQ==\n"+
  "-----END PRIVATE KEY-----\n"

  //decrypt password
  console.log("arrived before decryption")
  //console.log(encPass)
  /*const decPass = crypto.privateDecrypt(
    {
      key: privKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encPass
  );
  console.log("decrypted data: ", decPass.toString());*/
  
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
      isMod: user.isMod,
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
      isMod: user.isMod,
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


//@description     Delete the user
//@route           POST /api/users/delete
//@access          Public
const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  /*
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
  }*/
  console.log(user)
});



//post.postListLikeUsernames = arrayWithout(username, postListLikeUsernames);



export {allUsers, registerUser, authUser, resetPassword,deleteUser};
// module.exports = { allUsers, registerUser, authUser };
