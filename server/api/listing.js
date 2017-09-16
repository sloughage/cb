const router = require('koa-router')()
const bcrypt = require('bcryptjs')
const Listing = require('../models/Listing.js')
const User = require('../models/User.js')
const standardize = require('./standardize.js')

router.get('/:id', async ctx => {
  try {
    let id = ctx.params.id
    let db_listing = await Listing.findOne({_id: id})
    let listing = standardize.listing(db_listing)
    ctx.body = {res: listing}
  } catch (err) {
    ctx.body = {err: 'listing not found'}
  }
})

router.post('/', async ctx => {
  try {
    let user = ctx.session.user
    let query = ctx.request.query
    let new_listing = standardize.newListing(user, query)
    let db_listing = await Listing.create(new_listing)
    let listing = standardize.listing(db_listing)
    ctx.body = {message: 'listing posted', res: listing}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.put('/:id', async ctx => {
  try {
    let user = ctx.session.user
    let id = ctx.params.id
    let query = ctx.request.query
    let updated_listing = standardize.updateListing(query)
    let db_listing = await Listing.findOneAndUpdate({_id: id, userid: user.id}, updated_listing, {new: true})
    let listing = standardize.listing(db_listing)
    ctx.body = {message: 'listing updated', res: listing}
  } catch (err) {
    ctx.body = {err}
  }
})

router.delete('/:id', async ctx => {
  try {
    let user = ctx.session.user
    let id = ctx.params.id
    let db_res = await Listing.remove({_id: id, userid: user.id})
    ctx.body = {message: 'listing deleted'}
  } catch (err) {
    ctx.body = {err: 'listing not found'}
  }
})

// testing only

router.get('/', async ctx => {
  let listings = await Listing.find()
  ctx.body = {res: listings}
})

router.delete('/', async ctx => {
  let del_listings = await Listing.remove()
  ctx.body = {message: 'all listings deleted', res: del_listings}
})

module.exports = router
