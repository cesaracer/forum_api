const functions = require('firebase-functions');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//connecting to db
mongoose.connect("myconnectionstring", { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

//initializing routers
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const userRouter = require('./routes/users')

app.use(express.json())
//enabling cors
app.use(cors({origin: true}))

//defining router paths
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/users', userRouter)

const port = process.env.port
app.listen(port, () => console.log('Server started'))

exports.api = functions.https.onRequest(app)