const router = require('koa-router')()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

router.get('/', async ctx => {
  let users = await User.find()
  let userlist = users.map(u => u.username)
  ctx.body = {res: userlist}
})

router.post('/register/:username/:password', async ctx => {
  let body
  let username = ctx.params.username
  let password = ctx.params.password
  let existing_user = await User.findOne({username: username})
  if (existing_user) {
    body = {message: 'username in use'}
  } else {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    let new_user = await User.create({
      username: username,
      password: hash
    })
    body = {message: 'registered'}
  }
  ctx.body = body
})

router.post('/login/:username/:password', async ctx => {
  let body
  let username = ctx.params.username
  let password = ctx.params.password
  let user = await User.findOne({username: username})
  if (user === null) {
    body = {message: 'username and password not found'}
  } else {
    let arePasswordsEqual = await bcrypt.compare(password, user.password)
    if (arePasswordsEqual) {
      body = {message: 'logged in'}
    } else {
      body = {message: 'username and password not found'}
    }
  }
  ctx.body = body
})

router.post('/logout', async ctx => {
  ctx.body = {message: 'logged out'}
})

router.delete('/:username', async ctx => {
  let username = ctx.params.username
  let deleted_user = await User.remove({username: username})
  ctx.body = {message: 'deleted'}
})


// router.get('/register', (req, res) => {
//   res.render('register', {
//     isLoggedIn: req.session.isLoggedIn
//   })
// })

// router.post('/register', (req, res) => {
//   User.findOne({username: req.body.username})
//   .then(user => {
//     return bcrypt.genSalt(10)
//   }).then(salt => {
//     return bcrypt.hash(req.body.password, salt)
//   }).then(hash => {
//     return User.create({
//       username: req.body.username,
//       password: hash
//     })
//   }).then(user => {
//     req.session.username = user.username
//     req.session.userId = user._id
//     req.session.isLoggedIn = true
//     res.send('registered')
//   }).catch(err => {
//     res.send(err)
//   })
// })

// router.get('/login', (req, res) => {
//   res.render('login', {
//     isLoggedIn: req.session.isLoggedIn
//   })
// })

// router.post('/login', (req, res) => {
//   let tuser
//   User.findOne({username: req.body.username})
//   .then(user => {
//     tuser = user
//     return bcrypt.compare(req.body.password, tuser.password)
//   }).then(isMatch => {
//     if (isMatch) {
//       req.session.username = tuser.username
//       req.session.userId = tuser.id
//       req.session.isLoggedIn = true
//       res.send('logged in')
//     } else {
//       res.send('username/password incorrect')
//     }
//   }).catch(err => {
//     res.send(err)
//   })
// })

// router.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       res.send(err)
//     } else {
//       res.send('logged out')
//     }
//   })
// })

// router.get('/users', (req, res) => {
//   User.find()
//   .then(users => {
//     res.render('users', {
//       isLoggedIn: req.session.isLoggedIn,
//       users: users
//     })
//   }).catch(err => {
//     res.send(err)
//   })
// })

// router.get('/:username', (req, res) => {
//   User.findOne({username: req.params.username})
//   .then(user => {
//     res.render('user', {
//       isLoggedIn: req.session.isLoggedIn,
//       user: user
//     })
//   })
// }).catch(err => {
//   res.send(err)
// })

module.exports = router