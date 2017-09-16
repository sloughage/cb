const router = require('koa-router')()
const User = require('../models/User.js')
const Listing = require('../models/Listing.js')
const bcrypt = require('bcryptjs')
const standardize = require('./standardize.js')

router.get('/', async ctx => {
  let user = ctx.session.user
  if (user) ctx.body = {res: user}
  else ctx.body = {res: {isLoggedIn: false}}
})

router.get('/cart', async ctx => {
  try {
    let user = ctx.session.user
    let db_user = await User.findOne({_id: user.id})
    let db_listings = await Promise.all(
      db_user.cart.map(async x => {
        try {return await Listing.findOne({_id: x})}
        catch (err) {return null}
      }))
    let cart = standardize.listings(db_listings.filter(x => x))
    ctx.body = {res: cart}
  } catch (err) {
    ctx.body = {err: 'not logged in'}
  }
})

router.put('/cart/:id', async ctx => {
  try {
    let user = ctx.session.user
    let id = ctx.params.id
    let db_res = await User.updateOne({_id: user.id}, {$addToSet: {cart: id}})
    ctx.body = {message: db_res.nModified ? 'added to cart' : 'already in cart'}
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
    ctx.body = {res: profile}
  } catch (err) {
    ctx.body = {err: 'user not found'}
  }
})

router.post('/register/:username/:password', async ctx => {
  let username = ctx.params.username
  let password = ctx.params.password
  let existing_user = await User.findOne({username: username})
  if (existing_user) {
    ctx.body = {message: 'username in use'}
  } else {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    let new_user = await User.create({
      username,
      password: hash,
      cart: []
    })
    let user = {
      isLoggedIn: true,
      id: new_user.id,
      username: new_user.username
    }
    ctx.session.user = user
    ctx.body = {message: 'registered', res: user}
  }
})

router.post('/login/:username/:password', async ctx => {
  let username = ctx.params.username
  let password = ctx.params.password
  let existing_user = await User.findOne({username: username})
  if (!existing_user) {
    ctx.body = {err: 'username not found'}
  } else {
    let arePasswordsEqual = await bcrypt.compare(password, existing_user.password)
    if (!arePasswordsEqual) {
      ctx.body = {err: 'password incorrect'}
    } else {
      let user = {
        isLoggedIn: true,
        id: existing_user.id,
        username: existing_user.username
      }
      ctx.session.user = user
      ctx.body = {message: 'logged in', res: user}
    }
  }
})

router.post('/logout', async ctx => {
  ctx.session.user = null
  ctx.body = {message: 'logged out', res: {isLoggedIn: false}}
})

// testing only

router.get('/all', async ctx => {
  let users = await User.find()
  ctx.body = {res: users}
})

router.delete('/cart', async ctx => {
  try {
    let user = ctx.session.user
    let dbres = await User.updateOne({_id: user.id}, {$set: {cart: []}})
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
