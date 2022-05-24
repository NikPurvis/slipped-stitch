// models/yarn.js

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const commentSchema = require("./comment")
const picSchema = require("./picture")

const yarnSchema = new Schema(
	{
		brand: {
			type: String,
			required: true
		},
		weight: {
			type: String,
			enum: ["1 - Superfine", "2 - Fine", "3 - Light", "4 - Medium", "5 - Bulky", "6 - Super Bulky", "7 - Jumbo"],
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		whereBought: {
			type: String,
			required: false,
		},
		dyelot: {
			type: String,
			required: false,
		},
		notes: {
			type: String,
			required: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		pictures: [picSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Yarn", yarnSchema)
