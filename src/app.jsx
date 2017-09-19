import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/header.jsx'
import Loading from './components/loading.jsx'
import Home from './components/home.jsx'
import Search from './components/search.jsx'
import Listing from './components/listing.jsx'
import NewListing from './components/newListing.jsx'
import User from './components/user.jsx'
import Cart from './components/cart.jsx'
import NotFound from './components/notFound.jsx'
import MessageBox from './components/messageBox.jsx'

import construct from './utility/construct.js'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      format: 'loading',
      user: {},
      message: null,
      dropdown: construct.dropdown()
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.clickFilter = this.clickFilter.bind(this)
    this.clickBtn = this.clickBtn.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  componentDidMount () {
    this.loadUser()
    this.loadMain(window.location.pathname.slice(1), window.location.search)
    document.addEventListener('mousedown', this.clickHandler)
  }

  async loadUser () {
    let obj = await fetch('/api/user', {credentials: 'include'})
    let res = await obj.json()
    if (res.err) {
      console.log(res.err)
    } else {
      this.state.user = res.user
      this.setState(this.state)
    }
  }

  async loadMain (pathname, search='') {
    if (!pathname) {
      this.state.input = ''
      this.state.format = 'home'
    } else if (pathname.startsWith('search')) {
      let obj = await fetch('/api/' + pathname + search)
      let res = await obj.json()
      if (res.err) {
        console.log(res.err)
      } else {
        this.state.listings = res.listings
        this.state.categories = res.categories
        this.state.input = res.input
        this.state.format = 'search'
      }
    } else if (pathname.startsWith('listing')) {
      let obj = await fetch('/api/' + pathname, {credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        console.log(res.err)
      } else {
        this.state.listing = res.listing
        this.state.format = 'listing'
      }
    } else if (pathname.startsWith('user')) {
      let obj = await fetch('/api/' + pathname)
      let res = await obj.json()
      if (res.err) {
        console.log(res.err)
      } else {
        this.state.profile = res.profile
        this.state.format = 'user'
      }
    } else if (pathname === 'new') {
      this.state.rawListing = construct.new()
      this.state.format = 'new'
    } else if (pathname === 'cart') {
      let obj = await fetch('/api/user/cart', {credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        console.log(res.err)
      } else {
        this.state.cart = res.cart
      }
      this.state.format = 'cart'
    }
    if (this.state.format === 'loading') this.state.format = '404'
    this.setState(this.state)
  }

  redirect (url, hold) {
    if (!hold) this.state.message = []
    this.state.format = 'loading'
    this.setState(this.state)
    window.history.pushState(null, null, '/' + url)
    this.loadMain(...url.split(/(?=\?)/))
  }

  clickHandler (e) {
    let cat = e.target.id
    let list = ['login', 'register', 'settings']
    let temp = list.includes(cat) ? this.state.dropdown[cat].open : undefined
    let [lc, rc, sc] = list.map(x => document.getElementById(x + 'cont'))
    if (![lc, rc, sc].some(x => x && x.contains(e.target))) {
      this.state.dropdown = construct.dropdown()
      if (typeof temp !== 'undefined') this.state.dropdown[cat].open = !temp
      this.setState(this.state)
    }
  }

  inputChange (e, field, i, cat) {
    if (!field) {
      this.state.input = e.target.value
    } else if (cat) {
      this.state.dropdown[cat][field] = e.target.value
    } else if (e) {
      if (typeof i !== 'undefined') this.state.rawListing[field][i] = e.target.value
      else this.state.rawListing[field] = e.target.value
    } else {
      if (i) this.state.rawListing[field].splice(i, 1)
      else this.state.rawListing[field].push('')
    }
    this.setState(this.state)
  }

  clickFilter (i, j) {
    if (typeof j === 'undefined') {
      let cat = this.state.categories[i]
      cat.open = !cat.open
    } else {
      let values = this.state.categories[i].values
      values[j].sel = !values[j].sel
      if (i === 0) values.forEach((x, k) => {if (k !== j) values[k].sel = false})
    }
    this.setState(this.state)
  }

  async clickBtn (btn, z) {
    if (btn === 'home') {
      this.redirect('')
    } else if (btn === 'login' || btn === 'register' || btn === 'logout') {
      let cat = this.state.dropdown[btn]
      let url = '/api/user/' + btn
      if (btn !== 'logout') url += '/' + cat.username + '/' + cat.password
      let obj = await fetch(url, {method: 'post', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
      } else {
        this.state.user = res.user
        this.state.dropdown = construct.dropdown()
        this.state.message = {text: res.message, type: 'msg'}
        if (this.state.format === 'cart') this.loadMain('cart')
      }
      this.setState(this.state)
    } else if (btn === 'search') {
      let search = construct.search(this.state, z)
      this.redirect(search)
    } else if (btn === 'post') {
      let query = construct.query(this.state.rawListing)
      let url = '/api/listing?' + query
      let obj = await fetch(url, {method: 'post', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
        this.setState(this.state)
      }
      else {
        this.state.message = {text: res.message, type: 'msg'}
        this.redirect('listing/' + res.listing.id, true)
      }
    } else if (btn === 'new') {
      this.redirect('new')
    } else if (btn === 'cart') {
      this.redirect('cart')
    } else if (btn === 'remove') {
      let url = '/api/user/cart/' + z
      let obj = await fetch(url, {method: 'delete', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
      } else {
        if (this.state.cart) this.state.cart = this.state.cart.filter(x => x.id !== z)
        this.state.user.cart = this.state.user.cart.filter(x => x !== z)
        this.state.message = {text: res.message, type: 'msg'}
      }
      this.setState(this.state)
    } else if (btn === 'listing') {
      this.redirect('listing/' + z)
    } else if (btn === 'add') {
      let url = '/api/user/cart/' + this.state.listing.id
      let obj = await fetch(url, {method: 'put', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
      } else {
        if (res.id) this.state.user.cart.push(res.id)
        this.state.message = {text: res.message, type: 'msg'}
      }
      this.setState(this.state)
    } else if (btn === 'edit') {
      this.state.listing.edit = true
      this.state.rawListing = construct.raw(this.state.listing)
      this.setState(this.state)
    } else if (btn === 'save') {
      let query = construct.query(this.state.rawListing)
      let url = '/api/listing/' + this.state.listing.id + '?' + query
      let obj = await fetch(url, {method: 'put', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
      }
      else {
        this.state.listing = res.listing
        this.state.message = {text: res.message, type: 'msg'}
      }
      this.setState(this.state)
    } else if (btn === 'delete') {
      let url = '/api/listing/' + this.state.listing.id
      let obj = await fetch(url, {method: 'delete', credentials: 'include'})
      let res = await obj.json()
      if (res.err) {
        this.state.message = {text: res.err, type: 'err'}
        this.setState(this.state)
      }
      else {
        this.state.message = {text: res.message, type: 'msg'}
        this.redirect('', true)
      }
    }
  }


  render () { return (
    <div>
      <Header
        user={this.state.user}
        dropdown={this.state.dropdown}
        inputChange={this.inputChange}
        clickBtn={this.clickBtn} />
      <MessageBox message={this.state.message} />
      { this.state.format === 'loading'
      ? <Loading />
      : this.state.format === 'home'
      ? <Home
          input={this.state.input}
          inputChange={this.inputChange}
          clickBtn={this.clickBtn} />
      : this.state.format === 'new'
      ? <NewListing
          isLoggedIn={this.state.user.isLoggedIn}
          rawListing={this.state.rawListing}
          inputChange={this.inputChange}
          clickBtn={this.clickBtn} />
      : this.state.format === 'search'
      ? <Search
          input={this.state.input}
          inputChange={this.inputChange}
          clickBtn={this.clickBtn}
          categories={this.state.categories}
          clickFilter={this.clickFilter}
          listings={this.state.listings}
          columns={['title', 'by', 'tag', 'seller', 'price']} />
      : this.state.format === 'listing'
      ? <Listing
          listing={this.state.listing}
          clickBtn={this.clickBtn}
          user={this.state.user}
          rawListing={this.state.rawListing}
          inputChange={this.inputChange} />
      : this.state.format === 'user'
      ? <User
          user={this.state.profile}
          clickBtn={this.clickBtn} />
      : this.state.format === 'cart'
      ? <Cart
          isLoggedIn={this.state.user.isLoggedIn}
          listings={this.state.cart}
          clickBtn={this.clickBtn} />
      : <NotFound />
      }
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
