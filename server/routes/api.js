const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const NewsfeedItem = require('../models/newsfeed-item');

const db = "mongodb://stephen:stephen1@ds115971.mlab.com:15971/newsfeed";
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function(err){
	if(err){
		console.log("Error! " + err);
	}
});


router.get('/', function(req, res){
	res.send('api works');
});

//Get all newsfeed items from db
router.get('/newsfeed', function(req, res){
	console.log('Get request for newsfeed');
	NewsfeedItem.find({})
	.exec(function(err, newsfeed){
		if(err){
			console.log("Error retrieving newsfeed");
		} else{
			res.json(newsfeed.sort(function(a, b){
				return b.date > a.date ? 1 : -1;
			}));
		}
	})
});

//Get single newsfeed item by id
router.get('/newsfeed/:id', function(req, res){
	console.log('Get request for single newsfeed item');
	NewsfeedItem.findById(req.params.id)
	.exec(function(err, newsfeedItem){
		if(err){
			console.log("Error retrieving newsfeed item");
		} else{
			res.json(newsfeedItem);
		}
	})
});

//Insert new newsfeed item
router.post('/newsfeedItem', function(req, res){
	console.log("Post a newsfeed item");
	var newNewsfeedItem = new NewsfeedItem();
	newNewsfeedItem.text = req.body.text;
	newNewsfeedItem.date = req.body.date;
	newNewsfeedItem.save(function(err, insertedNewsfeedItem){
		if(err){
			console.log("Error saving newsfeed item");
		} else{
			res.json(insertedNewsfeedItem);
		}
	});
});




module.exports = router;