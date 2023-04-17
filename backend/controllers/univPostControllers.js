//import express from 'express';
// const express = require('express');
import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3'
import fetch from 'node-fetch';

//import request from "request"
// import {createPostmodel} from './hey.js'
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");


// const mongoose = require('mongoose');
import mongoose from 'mongoose';


// const Postmodel = require("../models/postModel");
import Postmodel from '../models/postModel.js';


const router = express.Router();



const s3 = new aws.S3({
    accessKeyId: 'AKIAUTVZCIJBJRY6SLNJ',
    secretAccessKey: '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',
    region: 'us-east-1',
  });
  
  
  
  
  const upload = (bucketName) =>
    multer({
    
      storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, `image-${Date.now()}.jpeg`);
        },
      }),
    });

export const getPosts = async (req, res) => { 
// module.exports.getPosts = async (req, res) => { 
    try {
        const Messages = await Postmodel.find();
                
        res.status(200).json(Messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost  = async (req, res) => { 

// module.exports.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Postmodel.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
  // module.exports.createPost = async (req, res) => {
    // let fileList = req.files,
    // fileLocation;
      let len = req.body.len
      const uploadSingle = upload("stevenewbucket").array( 'imagecropped', len );
        uploadSingle(req, res, async (err) => {
          if (err)
            return res.status(400).json({ success: false, message: err.message });
      try {
          let fileArray = req.files,
          fileLocation;
  
          const address = req.body.address
          console.log(address);
          const description = req.body.description
          const username = req.body.username
          const original_poster = req.body.original_poster
          const galleryImgLocationArray = [];
          for ( let i = 0; i < fileArray.length; i++ ) {
            fileLocation = fileArray[ i ].location;
            // console.log( 'filenm', fileLocation );
                      // console.log( 'filearray', JSON.stringify(fileArray) );
            galleryImgLocationArray.push( fileLocation )
          }
  
          await Postmodel.create({
              photos: galleryImgLocationArray, 
              address: address,
              description: description,
              username: username,
              original_poster: original_poster,
          });
  
  
      } catch (error) {
        //  res.status(409).json({data: data});
      }
  });
  };
  
  


export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  console.log("POSTCONTROLLER DEL");
  await Postmodel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}



export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await Postmodel.findById(id);

  const updatedPost = await Postmodel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

export const missPostAdd = async (req, res) => {
  const { id } = req.params;
  console.log("missPostAdd");
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await Postmodel.findById(id);

  const updatedPost = await Postmodel.findByIdAndUpdate(id, { MissCount: post.MissCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

export const missPostSub = async (req, res) => {
  const { id } = req.params;
  console.log("missPostSub");

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await Postmodel.findById(id);

  const updatedPost = await Postmodel.findByIdAndUpdate(id, { MissCount: post.MissCount - 1 }, { new: true });
  
  res.json(updatedPost);
}



export const dislikePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await Postmodel.findById(id);

  const updatedPost = await Postmodel.findByIdAndUpdate(id, { likeCount: post.likeCount - 1 }, { new: true });
  
  res.json(updatedPost);
}
const arrayWithout = (item ,elist)=>{
  
  elist.filter(function (letter) {
  return letter !== item;
})}

export const addUsernameDisLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    console.log("addUsernameDisLikes");
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const post = await Postmodel.findById(id);
  //post.postListLikeUsernames = arrayWithout(username, postListLikeUsernames);
  const updatedPost = await Postmodel.findByIdAndUpdate(id, { $push: { postListDisLikeUsernames: username }}, { new: true });
  
  res.json(updatedPost);
    
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


//post.postListLikeUsernames = arrayWithout(username, postListLikeUsernames);
export const subUsernameLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    console.log(`Trying to remove ${username} from dislikes for post with id ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Postmodel.findByIdAndUpdate(
      id,
      { $pull: { postListLikeUsernames: username } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};


export const addUsernameMiss = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    console.log("postListMissUsernames");
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const post = await Postmodel.findById(id);
  //post.postListLikeUsernames = arrayWithout(username, postListLikeUsernames);
  const updatedPost = await Postmodel.findByIdAndUpdate(id, { $push: { postListMissUsernames: username }}, { new: true });
  
  res.json(updatedPost);
    
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const subUsernameMiss = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    console.log(`Trying to remove ${username} from dislikes for post with id ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Postmodel.findByIdAndUpdate(
      id,
      { $pull: { postListMissUsernames: username } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};



export const subUsernameDisLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  // const post = await Postmodel.findById(id);
  // post.postListDisLikeUsernames = post.postListDisLikeUsernames.filter(user => user !== username);
  // await post.save();
  const post = await Postmodel.findByIdAndUpdate(
    id,
    { $pull: { postListDisLikeUsernames: username } },
    { new: true }
  );
  res.json(post);

 
    
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const addUsernameLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    console.log(username + "username");
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Postmodel.findById(id);
    // post.postListDisLikeUsernames = arrayWithout(username, postListDisLikeUsernames);
    const updatedPost = await Postmodel.findByIdAndUpdate(id, { $push: { postListLikeUsernames: username }}, { new: true });
    res.json(updatedPost);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// export const addUsername = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const username = req.body.username;
//   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
//   const post = await Postmodel.findById(id);
//     post.postListLikeUsernames.push(username);
//     await post.save();
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

export const takeUsernameDisLikes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Postmodel.findById(id);

    const username = req.body.username;
    console.log(username + "username");

    if (!username) return res.status(400).send({ error: 'Username is required' });

    post.postListDisLikeUsernames.push(username);
    await post.save();

    return res.send({ message: 'Username added successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
export const fetchPostById  = async (req, res) => { 
  const { id } = req.params;

  try {
    const post = await Postmodel.findById(id);
        
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
// export const addUsername = async (req, res) => {
//   try {
//     console.log(req);
//     const { id } = req.params;
//     // console.log(id +" id")
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
//     const post = await Postmodel.findById(id);
//     // console.log(JSON.stringify(post));
//       const username = req.body.username
//       console.log(username?.username + "usernamee");
//       post.postListUsernames.push(username);
//       await post.save();
//       console.log("here");

//       return res.send({ message: 'Username added successfully' });
//   } catch (error) {
//       return res.status(500).send({ error: error.message });
//   }
// };
/*export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, selectedFile, discription, address} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {title, discription, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
*/

// export default router;