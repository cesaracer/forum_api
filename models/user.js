const mongoose = require('mongoose')

//defining user model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    collection: 'Users'
})

module.exports = mongoose.model('User', userSchema)