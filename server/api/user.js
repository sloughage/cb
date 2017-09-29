const router = require('koa-router')()
const User = require('../models/User.js')
const Listing = require('../models/Listing.js')
const bcrypt = require('bcryptjs')
const standardize = require('./standardize.js')

router.get('/', async ctx => {
  let cookie_user = ctx.session.user
  if (cookie_user && cookie_user.isLoggedIn) {
    let db_user = await User.findOne({_id: cookie_user.id})
    let user = standardize.user(db_user)
    ctx.body = {user}
  } else {
    ctx.body = {user: {isLoggedIn: false}}
  }
})

router.get('/cart', async ctx => {
  try {
    let user = ctx.session.user
    let db_user = await User.findOne({_id: user.id})
    let db_listings = await Listing.find({_id: {$in: db_user.cart}})
    let cart = standardize.listings(db_listings)
    ctx.body = {cart}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.put('/cart/:id', async ctx => {
  try {
    let user = ctx.session.user
    let id = ctx.params.id
    let db_res = await User.updateOne({_id: user.id}, {$addToSet: {cart: id}})
    if (db_res.nModified) ctx.body = {message: 'added to cart', id}
    else ctx.body = {message: 'already in cart'}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.delete('/cart/:id', async ctx => {
  try {
    let user = ctx.session.user
    let id = ctx.params.id
    let db_res = await User.updateOne({_id: user.id}, {$pull: {cart: id}})
    ctx.body = {message: 'deleted from cart'}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.get('/:id', async ctx => {
  try {
    let id = ctx.params.id
    let db_user = await User.findOne({_id: id})
    let db_listings = await Listing.find({userid: id})
    let profile = {
      id: id,
      username: db_user.username,
      listings: standardize.listings(db_listings)
    }
    ctx.body = {profile}
  } catch (err) {
    ctx.body = {err: 'user not found'}
  }
})

router.post('/register', async ctx => {
  try {
    let username = ctx.query.username
    if (!username) throw 'username required'
    let password = ctx.query.password
    if (!password) throw 'password required'
    let existing_user = await User.findOne({username: username})
    if (existing_user) throw 'username in use'
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    let db_user = await User.create({
      username,
      password: hash,
      cart: []
    })
    let user = standardize.user(db_user)
    ctx.session.user = user
    ctx.body = {message: 'registered', user}
  } catch (err) {
    ctx.body = {err}
  }
})

router.post('/login', async ctx => {
  try {
    let username = ctx.query.username
    if (!username) throw 'username required'
    let password = ctx.query.password
    if (!password) throw 'password required'
    let db_user = await User.findOne({username: username})
    if (!db_user) throw 'username not found'
    let arePasswordsEqual = await bcrypt.compare(password, db_user.password)
    if (!arePasswordsEqual) throw 'password incorrect'
    let user = standardize.user(db_user)
    ctx.session.user = user
    ctx.body = {message: 'logged in', user}
  } catch (err) {
    ctx.body = {err}
  }
})

router.post('/logout', async ctx => {
  ctx.session.user = null
  let user = {isLoggedIn: false}
  ctx.body = {message: 'logged out', user}
})

// testing only

router.get('/', async ctx => {
  let users = await User.find()
  ctx.body = {users}
})

router.delete('/cart', async ctx => {
  try {
    let user = ctx.session.user
    let db_res = await User.updateOne({_id: user.id}, {$set: {cart: []}})
    ctx.body = {message: 'deleted cart'}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.delete('/', async ctx => {
  await User.remove()
  ctx.session.user = null
  ctx.body = {message: 'all users deleted'}
})

router.delete('/:id', async ctx => {
  let id = ctx.params.id
  ctx.session.user = null
  let db_res = await User.remove({_id: id})
  ctx.body = {message: 'user deleted'}
})

module.exports = router
