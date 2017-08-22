const router = require('koa-router')()

const testdata = require('./testdata.js')

router.get('/load', async ctx => {ctx.body = {res: testdata}})

module.exports = router