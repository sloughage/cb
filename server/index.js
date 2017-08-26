const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const send = require('koa-send')
const router = require('koa-router')()
const session = require('koa-session')
const mongoose = require('mongoose')
// const parser = require('koa-bodyparser')

app.keys = ['secret']

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/cb')

const Search = require('./api/search.js')
router.use('/api/search', Search.routes())

const User = require('./api/user.js')
router.use('/api/user', User.routes())

const Listing = require('./api/listing.js')
router.use('/api/listing', Listing.routes())

app
  .use(session(app))
  // .use(parser())
  .use(router.routes())
  // .use(router.allowedMethods())
  .use(static('build'))
  .use(async ctx => {await send(ctx, 'build/index.html')})
  .listen(3000)