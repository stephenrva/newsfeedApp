const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsfeedItemSchema = new Schema({
	text: String,
	date: String
});

module.exports = mongoose.model('newsfeedItem', newsfeedItemSchema, 'newsfeed');