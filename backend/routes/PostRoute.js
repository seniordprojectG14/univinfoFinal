import express from 'express';

//const express = require('express');


// const {getPosts, getPost, createPost, deletePost, likePost} = require("../controllers/univPostControllers");
import {getPosts, getPost, createPost, deletePost, likePost, dislikePost, addUsernameDisLikes, addUsernameLikes, subUsernameLikes, subUsernameDisLikes, fetchPostById, missPostAdd,missPostSub, addUsernameMiss, subUsernameMiss} from '../controllers/univPostControllers.js';

const router = express.Router();



//router.route("/").get(getPosts);
router.get('/', getPosts);
// router.get('/', getUsers);
router.post('/', createPost);
//router.route("/").post(createPost);

// router.route('/:id').get(getPost);
router.get('/:id', getPost);
//router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


router.patch('/:id/addUsernameMiss', addUsernameMiss);
router.patch('/:id/subUsernameMiss', subUsernameMiss);
router.patch('/:id/missPostSub', missPostSub);
router.patch('/:id/missPostAdd', missPostAdd);

router.patch('/:id/addUsernameDisLikes', addUsernameDisLikes);
router.patch('/:id/addUsernameLikes', addUsernameLikes);
router.patch('/:id/subUsernameLikes', subUsernameLikes);
router.patch('/:id/subUsernameDisLikes', subUsernameDisLikes);
router.get('/:id', fetchPostById);

// router.route('/:id').delete(deletePost);
router.patch('/:id/likePost', likePost);

router.patch('/:id/dislikePost', dislikePost);
// router.route('/:id/likePost').patch(likePost);

export default router;
// module.exports = router;