const router = require('koa-router')()
const User = require('../models/User.js')
const Listing = require('../models/Listing.js')
const bcrypt = require('bcryptjs')

router.get('/', async ctx => {
  let user = ctx.session.user
  if (user) ctx.body = {res: user}
  else ctx.body = {res: {isLoggedIn: false}}
})

router.get('/all', async ctx => {
  let users = await User.find()
  ctx.body = {res: users}
})

router.get('/:id', async ctx => {
  let id = ctx.params.id
  let user = await User.findOne({_id: id})
  console.log(user)
  if (!user) {
    ctx.body = {err: 'user not found'}
  } else {
    ctx.body = {res: {
      id: user._id,
      username: user.username
    }}
  }
})

router.get('/cart', async ctx => {
  let user = ctx.session.user
  if (!user || !user.isLoggedIn) {
    ctx.body = {err: 'not logged in'}
  } else {
    user = await User.findOne({id: user._id})
    let cart = []
    for (let x of user.cart) {
      let listing = await Listing.findOne({_id: x})
      if (listing) cart.push({
        title: listing.title,
        by: listing.by,
        tag: listing.tag,
        price: listing.price,
        seller: listing.username,
        id: listing.id
      })
    }
    ctx.body = {res: cart}
  }
})

router.put('/cart/:id', async ctx => {
  let user = ctx.session.user
  let id = ctx.params.id
  if (!user || !user.isLoggedIn) {
    ctx.body = {err: 'not logged in'}
  } else {
    let dbres = await User.updateOne({_id: user.id}, {$addToSet: {cart: id}})
    ctx.body = {message: dbres.nModified ? 'added to cart' : 'already in cart'}
  }
})

router.delete('/cart', async ctx => {
  let user = ctx.session.user
  if (!user || !user.isLoggedIn) {
    ctx.body = {err: 'not logged in'}
  } else {
    let dbres = await User.updateOne({_id: user.id}, {$set: {cart: []}})
    ctx.body = {message: 'deleted cart'}
  }
})

router.delete('/cart/:id', async ctx => {
  let user = ctx.session.user
  let id = ctx.params.id
  if (!user || !user.isLoggedIn) {
    ctx.body = {err: 'not logged in'}
  } else {
    let dbres = await User.updateOne({_id: user.id}, {$pull: {cart: id}})
    ctx.body = {message: 'deleted from cart'}
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
    ctx.body = {message: 'username not found'}
  } else {
    let arePasswordsEqual = await bcrypt.compare(password, existing_user.password)
    if (!arePasswordsEqual) {
      ctx.body = {message: 'password incorrect'}
    } else {
      let user = {
        isLoggedIn: true,
        id: existing_user.id,
        username: existing_user.username,
        cartcount: existing_user.cart.length
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

router.delete('/', async ctx => {
  await User.remove()
  ctx.session.user = null
  ctx.body = {message: 'all users deleted'}
})

router.delete('/:id', async ctx => {
  let id = ctx.params.id
  let user = ctx.session.user
  if (user && user.id === id) ctx.session.user = null
  let del_user = await User.remove({_id: id})
  ctx.body = {message: 'user deleted', res: del_user}
})

module.exports = router