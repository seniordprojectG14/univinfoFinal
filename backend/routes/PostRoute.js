import express from 'express';
//const express = require('express');


// const {getPosts, getPost, createPost, deletePost, likePost} = require("../controllers/univPostControllers");
import {getPosts, getPost, createPost, deletePost, likePost} from '../controllers/univPostControllers.js';

const router = express.Router();



//router.route("/").get(getPosts);
router.get('/', getPosts);
// router.get('/', getUsers);
router.post('/', createPost);
//router.route("/").post(createPost);

// router.route('/:id').get(getPost);
router.get('/:id', getPost);
//router.patch('/:id', updatePost);
router.delete('/:id', likePost);
// router.route('/:id').delete(deletePost);
router.patch('/:id/likePost', likePost);
// router.route('/:id/likePost').patch(likePost);

export default router;
// module.exports = router;