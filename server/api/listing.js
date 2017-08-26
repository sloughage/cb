const router = require('koa-router')()
const bcrypt = require('bcryptjs')
const Listing = require('../models/Listing.js')
const User = require('../models/User.js')

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

//make sure nothing is missing
//set up authentication
router.post('/', async ctx => {
  if (ctx.session.isLoggedIn) {
    let query = ctx.request.query
    let userid = ctx.session.id
    let username = ctx.session.username
    let title = query.title
    let by = query.by.constructor === Array ? query.by : [query.by]
    let tag = query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
    let price = query.price
    let new_listing = await Listing.create({userid, username, title, by, tag, price})
    ctx.body = {message: 'new listing', res: new_listing}
  } else {
    ctx.body = {message: 'not logged in'}
  }
})

router.delete('/', async ctx => {
  let deleted_listings = await Listing.remove()
  ctx.body = {message: 'all listings deleted'}
})

router.delete('/:id', async ctx => {
  let body
  let id = ctx.params.id
  let listing = await Listing.findOne({_id: id})
  if (!listing) {
    body = {message: 'listing not found'}
  } else {
    let deleted_listing = await Listing.remove({_id: id})
    body = {message: 'listing deleted'}
  }
  ctx.body = body
})

module.exports = router