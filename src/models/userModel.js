const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String },
	password: { type: String },

}, { timestamps: true });

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;


