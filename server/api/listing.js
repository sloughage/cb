const router = require('koa-router')()
const Listing = require('../models/Listing.js')
const bcrypt = require('bcryptjs')

router.get('/', async ctx => {
  let listings = await Listing.find()
  ctx.body = {res: listings}
})

router.get('/:id', async ctx => {
  let body
  let id = ctx.params.id
  let listing = await Listing.findOne({_id: id})
  if (listing) {
    body = {res: listing}
  } else {
    body = {message: 'listing not found'}
  }
  ctx.body = body
})

router.post('/', async ctx => {
  let body
  let query = ctx.request.query
  let new_listing = await Listing.create(query)
  body = {res: 'new listing', also: new_listing}
  ctx.body = body
})

router.delete('/:id', async ctx => {
  let body
  let id = ctx.params.id
  let user = await Listing.findOne({_id: id})
  if (!user) {
    body = {message: 'listing not found'}
  } else {
    let deleted_user = await Listing.remove({_id: id})
    body = {message: 'deleted'}
  }
  ctx.body = body
})

module.exports = router