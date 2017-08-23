const router = require('koa-router')()

router.get('/load', async ctx => {ctx.body = {res: require('./testdata.js')}})

router.get('/', async ctx => {
  let query = ctx.request.query
  let rarr = Object.keys(query).map(x => {
    let robj = {}
    robj[x] = query[x]
    return robj
  })
  ctx.body = {query: rarr}
})

module.exports = router