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
      username,
      password: hash,
      cart: []
    })
    let user = {
      isLoggedIn: true,
      id: new_user.id,
      username: new_user.username,
      cartcount: 0
    }
    ctx.session.user = user
    ctx.body = {message: 'registered', res: user}
  }
})

router.post('/login/:username/:password', async ctx => {
  let username = ctx.params.username
  let password = ctx.params.password
  console.log(ctx.header)
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