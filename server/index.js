require('dotenv').config()
const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const send = require('koa-send')
const router = require('koa-router')()
const session = require('koa-session')
const mongoose = require('mongoose')
const path = require('path')
// const delay = require('koa-delay')

const port = process.env.PORT || 3000
const db_host = process.env.DB_HOST || 'mongodb://localhost/cb'

app.keys = [process.env.KEY]

mongoose.Promise = global.Promise
mongoose.connect(db_host)
mongoose.connection.on('connected', () => {console.log('connected')})
mongoose.connection.on('error', err => {console.log('error')})
mongoose.connection.on('disconnected', () => {console.log('disconnected')})

const Search = require('./api/search.js')
const User = require('./api/user.js')
const Listing = require('./api/listing.js')
router.use('/api/search', Search.routes())
router.use('/api/user', User.routes())
router.use('/api/listing', Listing.routes())

app
  // .use(delay(300, 300))
  .use(session(app))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(static('build'))
  .use(async ctx => {await send(ctx, 'build/index.html')})
  .listen(port)
