const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},
{
    collection: 'Comments'
})

module.exports = mongoose.model('Comment', commentSchema)