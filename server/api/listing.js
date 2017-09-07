const router = require('koa-router')()
const bcrypt = require('bcryptjs')
const Listing = require('../models/Listing.js')
const User = require('../models/User.js')

router.get('/', async ctx => {
  let listings = await Listing.find()
  ctx.body = {res: listings}
})

router.get('/:id', async ctx => {
  let id = ctx.params.id
  let listing = await Listing.findOne({_id: id})
  if (listing) ctx.body = {res: listing}
  else ctx.body = {message: 'listing not found'}
})

router.post('/', async ctx => {
  let user = ctx.session.user
  if (user && user.isLoggedIn) {
    let query = ctx.request.query
    let userid = user.id
    let username = user.username
    let title = query.title
    let by = query.by.constructor === Array ? query.by : [query.by]
    let tag = query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
    let price = query.price
    let listing = await Listing.create({userid, username, title, by, tag, price})
    ctx.body = {message: 'listing posted', res: listing}
  } else {
    ctx.body = {message: 'not logged in'}
  }
})

router.delete('/', async ctx => {
  let del_listings = await Listing.remove()
  ctx.body = {message: 'all listings deleted', res: del_listings}
})

router.delete('/:id', async ctx => {
  let id = ctx.params.id
  let listing = await Listing.findOne({_id: id})
  if (!listing) {
    ctx.body = {message: 'listing not found'}
  } else {
    let del_listing = await Listing.remove({_id: id})
    ctx.body = {message: 'listing deleted', res: del_listing}
  }
})

module.exports = router