const router = require('koa-router')()
const User = require('../models/User.js')
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
      username: username,
      password: hash
    })
    ctx.session.user = {
      isLoggedIn: true,
      id: new_user.id,
      username: new_user.username,
      cartcount: 0
    }
    ctx.body = {message: 'registered', res: ctx.session.user}
  }
})

router.post('/login/:username/:password', async ctx => {
  let username = ctx.params.username
  let password = ctx.params.password
  let user = await User.findOne({username: username})
  if (user === null) {
    ctx.body = {message: 'username and password not found'}
  } else {
    let arePasswordsEqual = await bcrypt.compare(password, user.password)
    if (arePasswordsEqual) {
      ctx.session.user = {
        isLoggedIn: true,
        id: user.id,
        username: user.username,
        cartcount: user.cart ? user.cart.length : 0
      }
      ctx.body = {message: 'logged in', res: ctx.session.user}
    } else {
      ctx.body = {message: 'username and password not found'}
    }
  }
})

router.post('/logout', async ctx => {
  ctx.session = null
  ctx.body = {message: 'logged out', res: {isLoggedIn: false}}
})

router.delete('/', async ctx => {
  await User.remove()
  ctx.session = null
  ctx.body = {message: 'all users deleted'}
})

router.delete('/:id', async ctx => {
  let id = ctx.params.id
  if (ctx.session.user && ctx.session.user.id === id) ctx.session = null
  await User.remove({_id: id})
  ctx.body = {message: 'user deleted'}
})

module.exports = router