const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    title: {type: String },
    content: {type: String },
    author: {type: String }

});

postSchema.methods.display = function() {

    return {
	id: this._id,
	title: this.title,
	content: this.content,
	author: this.author
    }
}

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};
