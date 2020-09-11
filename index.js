const functions = require('firebase-functions');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect("myconnectionstring", { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const userRouter = require('./routes/users')

app.use(express.json())
app.use(cors({origin: true}))

app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/users', userRouter)

const port = process.env.port
app.listen(port, () => console.log('Server started'))

exports.api = functions.https.onRequest(app)