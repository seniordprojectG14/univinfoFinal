// const mongoose = require("mongoose");
import mongoose from 'mongoose';
    const PostModel = new mongoose.Schema({
    address: String,
    photos: [String],
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    typeofpost: String,
    username: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    MissCount: {
        type: Number,
        default: 0,
    }, 
    postListMissUsernames: [String],
    postListDisLikeUsernames: [String],
    postListLikeUsernames: [String],
    original_poster: String,
})

var Postmodel = mongoose.model('PostMessage', PostModel);
// module.exports = mongoose.model("PostModel", PostModel);

export default Postmodel;