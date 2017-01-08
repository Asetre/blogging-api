const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {DATABASE_URL, PORT} = require('./config');

const {Post} = require('./model.js');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.get('/posts', function(req, res) {
    Post.find()
    .then(function(posts) {
	console.log(posts);
	res.send(posts)
    })
    .catch(function(err) {
	console.log(err);
	res.status(500).json({error: 'internal server error'});

    });
});

app.post('/posts', function(req, res) {
   var requiredFields = {title: null, content: null, author: null}
   Post 
	   .create({
		   title: req.body.title,
		   content: req.body.content,
		   author: req.body.author
	   })
   .then(
		   function(posts){
			   res.status(200).json(posts);
		   }, function(e){
			res.status(500).json(e);		   
			   
		   })
   .catch(function(err) {
	   res.status(500).json({error: 'Internal server error'});
   });
});

app.put('/posts/:id', function(req, res) {
    var requiredFields = {title: null, content: null, author: null};
    console.log(req.body.title); 
    requiredFields.title = req.body.title;
    requiredFields.content = req.body.content;
    requiredFields.author = req.body.author;

    console.log(requiredFields);

    if(req.body.title && req.body.content && req.body.author) {
        Post.update({ _id: req.params.id},
	    {$set: { title: req.body.title,
		     content: req.body.content,
		     author: req.body.author
		   
       		   }
	    }
	);
    } else {
	console.log('error updating');

    }    
	
});

app.delete('/posts/:id', function(req, res) {
    Post.remove({_id: req.params.id})
    .then(function(posts) {
        res.json({message: 'Deleted ${posts'})
    })
    .catch(function(err) {
	console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    });
});

var server;

function startServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise(function(resolve, reject){
	mongoose.connect(databaseUrl,  function(err){
	    if (err) {
		return reject(err);
	    }
	    server = app.listen(port, function() {
		console.log(`Your app is listening on port ${port}`);
		resolve();
	    });
	});	    
    });
}

function closeServer() {
    return mongoose.disconnect().then(function() {
	return new Promise(function(resolve, reject) {
	    console.log('Closing server');
	    server.close(function(err) {

		if(err) {
		    return reject(err);
		}

		resolve();
	    });
	});
    });
}

if (require.main == module) {
    startServer().catch(function(err) {
	console.error(err);	    
    });
};

module.exports = {app, startServer, closeServer};

