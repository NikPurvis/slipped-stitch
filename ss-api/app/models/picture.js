// models/picture.js

// picture.js is a subdocument used with projects
const mongoose = require("mongoose")
const { Schema } = mongoose

const picSchema = new Schema(
    {
        source: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
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

module.exports = picSchema
