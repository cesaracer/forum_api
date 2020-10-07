const mongoose = require('mongoose')

//defininf post model
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{
    collection: 'Posts'
})

module.exports = mongoose.model('Post', postSchema)