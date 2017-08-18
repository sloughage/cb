// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const port = 3000
// const path = require('path')

// app.use(express.static(path.join(__dirname, '/../build')))

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/build/index.html')
// })

// // app.use('/u', require('./cont/user'))
// // app.use('/i', require('./cont/item'))
// app.use('/s', require('./controllers/search.js'))

// server.listen(port, () => {
//   console.log('listening on port ' + port)
// })

const Koa = require('koa')
const app = new Koa()
const send = require('koa-send')
const serve = require('koa-static')

app.use(serve('build'))

app.use(require('./routes/search.js'))
// app.use(require('./routes/listing.js'))

// app.use(async ctx => {ctx.body = 'hello'})
app.use(async ctx => {
  await send(ctx, './index.html')
})

app.listen(3000)