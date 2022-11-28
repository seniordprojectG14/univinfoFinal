const mongoose = require("mongoose");
    const PostModel = new mongoose.Schema({
    address: String,
    photos: [String],
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    username: String,
    
    
})

module.exports = mongoose.model("PostModel", PostModel);