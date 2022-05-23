// models/user.js

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: false,
		},
		about: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			required: false,
		},
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			// Remove hashedPassword field when we call .toObject
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

module.exports = mongoose.model("User", userSchema)
