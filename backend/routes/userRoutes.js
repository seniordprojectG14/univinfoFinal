// const express = require("express");
import express from 'express'
import {registerUser, authUser, allUsers} from '../controllers/userControllers.js';
import protect from "../middleware/authMiddleware.js"
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").get(protect, allUsers);
router.get("/", protect, allUsers);
router.post("/", registerUser);
// router.route("/").post(registerUser);
router.post("/login", authUser);


export default router;
