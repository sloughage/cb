const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, '/../build')))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

server.listen(port, () => {
  console.log('listening on port ' + port)
})