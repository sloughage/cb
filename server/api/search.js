const router = require('koa-router')()
const Listing = require('../models/Listing.js')
const standardize = require('./standardize.js')

router.get('/', async ctx => {
  try {
    let query = standardize.query(ctx.request.query)
    let search_obj = standardize.searchObj(query)
    let db_listings = await Listing.find(search_obj)
    let input = query.input.join(' ')
    let listings = standardize.listings(db_listings)
    let categories = standardize.categories(query, db_listings)
    ctx.body = {input, listings, categories}
  } catch (err) {
    ctx.body = {err}
  }
})

module.exports = router
