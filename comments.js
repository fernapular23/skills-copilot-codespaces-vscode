// create web server
// 1. load modules
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000

// 2. set middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 3. set router
// 3.1. get comments
app.get('/comments', (req, res) => {
  // 3.1.1. get comments from file
  const comments = JSON.parse(fs.readFileSync('./comments.json'))
  // 3.1.2. send comments
  res.send(comments)
})

// 3.2. add comment
app.post('/comments', (req, res) => {
  // 3.2.1. get comment from request
  const comment = req.body
  // 3.2.2. get comments from file
  const comments = JSON.parse(fs.readFileSync('./comments.json'))
  // 3.2.3. add comment to comments
  comments.push(comment)
  // 3.2.4. save comments to file
  fs.writeFileSync('./comments.json', JSON.stringify(comments))
  // 3.2.5. send comment
  res.send(comment)
})

// 3.3. delete comment
app.delete('/comments/:id', (req, res) => {
  // 3.3.1. get id from request
  const id = Number(req.params.id)
  // 3.3.2. get comments from file
  const comments = JSON.parse(fs.readFileSync('./comments.json'))
  // 3.3.3. delete comment from comments
  comments.splice(id, 1)
  // 3.3.4. save comments to file
  fs.writeFileSync('./comments.json', JSON.stringify(comments))
  // 3.3.5. send comment
  res.send(comments)
})

// 4. start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})