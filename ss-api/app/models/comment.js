// models/comment.js

// comment.js will be a subdocument (so not model) used with projects
const mongoose = require("mongoose")
const { Schema } = mongoose

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

module.exports = commentSchema
