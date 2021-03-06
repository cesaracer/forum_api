const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//retrieve all posts
router.get('/all', async (req, res) => {
    const posts = await Post.find()
    try{
        res.status(201).json(posts)
    }
    catch(err){
        res.json({message: err.message})
    }
    
})

//add post to db
router.post('/add', async (req, res) => {
    //creating post object
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        userId: req.body.userId
    })
    try{
        await post.save()
        res.json(post)
    }
    catch(err){
        res.json({message: err.message})
    }
})

//update specific post
router.patch('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)

    //updating post where appropriate
    if(req.body.title !== ""){
        post.title = req.body.title
    }

    if(req.body.content !== ""){
        post.content = req.body.content
    }

    try{
        await post.save()
        res.status(201).json({message: 'post updated'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete specific post
router.delete('/delete/:id', async (req, res) => {
    let post = Post.findById(req.params.id)
    try{
        await post.remove()
        res.json({message: 'Post deleted'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router