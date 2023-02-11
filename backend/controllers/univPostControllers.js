//import express from 'express';
// const express = require('express');
import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3'
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
        const description = req.body.description
        const username = req.body.username
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
        });

    } catch (error) {
      //  res.status(409).json({data: data});
    }
});
};

export const deletePost = async (req, res) => {
// module.exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Postmodel.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

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
