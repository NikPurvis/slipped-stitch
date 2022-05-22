// models/project.js

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const commentSchema = require("./comment")

const projectSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		type: {
			type: String,
			enum: ["hat", "scarf", "sweater", "socks", "dishcloth", "blanket", "toy", "other"],
			required: true,
		},
		dateStarted: {
			type: Date,
			required: false,
		},
		completed: {
			type: Boolean,
			default: false,
			required: true,
		},
		dateDone: {
			type: Date,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
		notes: {
			type: String,
			required: false,
		},
		patternLink: {
			type: String,
			required: false,
		},
		skill: {
			type: String,
			enum: ["beginner", "intermediate", "advanced"],
			required: true,
		},
		yarnUsed: [{
			type: Schema.Types.ObjectId,
			ref: "Yarn"
		}],
		knitter: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		comments: [commentSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Projects", projectSchema)
