const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {Post} = require('./model.js');

mongoose.Promise = global.Promise;



var DATABSE_URL = 'mongodb://localhost/blogging-app';
var PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get('/posts', function(req, res) {
    Post.find().exec()
    .then(function(posts) {
	res.send(posts);
    });
});

app.post('/posts', function(req, res) {
   var requiredFields = {title: null, content: null, author: null}

   requiredFields.title = req.body.title;
   requiredFields.content = req.body.content;
   requiredFields.author = req.body.author;

   if(requiredFields.title && requiredFields.content && requiredFields.author){
	   console.log(requiredFields);
	   Post 
	    .create({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author

	    })
	    .then(
		function(posts){
		    res.status(201).json(posts.display());
		    console.log('Succesfull!');
		})
	    .catch(function(err) {
		console.log(err);	    
	    });
   } else {
        for (keys in requiredFields) {
	    if( !(requiredFields[keys])) {
	        console.log('Missing ' + keys);
            }
        }
   }

});

app.get('/posts/:id', function(req, res) {
    

});







function startServer() {
    return new Promise(function(resolve, reject){
	mongoose.connect('mongodb://localhost/blogging-app', function(err){
	    if (err) {
		return reject(err);
	    }

	   app.listen(8000, function() {
		console.log('Your app is listening on port 8000');
		resolve();
	   });
	});	    
    });

}


startServer();










//var server;

//function startServer(DATABASE_URL, PORT) {
//    return new Promise(function(resolve, reject) {
//	mongoose.connect(DATABASE_URL, function(err) {
//	    if (err) {
//		return reject(err);
//	    }
//	    
//	    server = app.listen(PORT, function() {
//		console.log('Your app is listening on port 8000');
//		resolve();
//	    })
//	    .on('error', function(err) {
//		mongoose.disconnect();
//		reject(err);
////	    });
//	});
 //   });
//}
//
//function closeServer() {
//
 //   return mongoose.disconnect().then(function(){
//	return new Promise(function(resolve, reject) {
//	    console.log('Closing server');
//	    server.close(function(err){
//		if (err) {
//		    return reject(err);
//		}
//		resolve();
//	    });
//	});
 //   });
//}

//startServer(DATABASE_URL, PORT);
