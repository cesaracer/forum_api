const express = require('express')
const router = express.Router()
const User = require('../models/user')
const hash = require('object-hash')

//creates user profile
router.post('/signup', async (req, res) => {
    //checking if email is already in use
    const existing = User.find({'email': req.body.email})
    if((await existing).length >= 1){
        res.json({message: 'email already in use'})
    }
    try{
        //hashing user password for security
        const hashedPassword = await hash({password: req.body.password})
        //creating user object
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        res.status(201).json({message: 'user created'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//user authentication
router.post('/login', async (req, res) => {
    let user = await User.findOne({'email': req.body.email})
    if(user === null){
        res.status(404).json({message: 'User not found'})
    }
    try{
        //hashes entered password to compare with hashed password in db
        if(user.password === hash({password: req.body.password})){
            res.json({userId: user.id, username: user.username})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete specific user account
router.delete('/delete/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    try{
        await user.remove()
        res.status(201).json({message: 'user deleted'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router