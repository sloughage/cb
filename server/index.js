const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const send = require('koa-send')
const router = require('koa-router')()

const Search = require('./api/search.js')

router.use('/api/search', Search.routes())

app
  .use(router.routes())
  // .use(router.allowedMethods())
  .use(static('build'))
  .use(async ctx => {await send(ctx, 'build/index.html')})
  .listen(3000)