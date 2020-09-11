const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

 router.get('/all/:id', async (req, res) => {
    const comments = await Comment.find({'postId': req.params.id})
    try{
        res.status(201).json(comments)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
 })

 router.post('/add', async (req, res) => {
     const comment = new Comment({
         postId: req.body.postId,
         userId: req.body.userId,
         author: req.body.author,
         content: req.body.content,
         date: Date.now()
     })
     try{
         const newComment = await comment.save()
         res.status(201).json({newComment})
     }
     catch(err){
         res.status(500).json({message: err.message})
     }
 })

 router.delete('/delete/:id', async (req, res) => {
     const comment = Comment.findById(req.params.id)
     try{
         await comment.remove()
         res.status(201).json({message: 'comment deleted'})
     }
     catch(err){
         res.status(500).json({message: err.message})
     }
 })

 router.patch('/edit/:id', async (req, res) => {
     const comment = await Comment.findByIdAndUpdate(req.params.id, {'content': req.body.content})
     try{
         await comment.save()
         res.status(201).json({message: 'comment updated'})
     }
     catch(err){
         res.status(500).json({message: err.message})
     }
 })

module.exports = router