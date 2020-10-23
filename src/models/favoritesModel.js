const mongoose = require("mongoose")

const favoritesSchema = new mongoose.Schema({
	title: { type: String },
  description: { type: String },
  image: {type: String}

}, { timestamps: true });

const favoritesModel = mongoose.model('Favorites', favoritesSchema);

module.exports = favoritesModel;