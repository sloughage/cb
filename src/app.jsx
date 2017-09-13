import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/header.jsx'
import Filter from './components/filter.jsx'
import Listings from './components/listings.jsx'
import Search from './components/search.jsx'
import Loading from './components/loading.jsx'
import Listing from './components/listing.jsx'
import NewListing from './components/newListing.jsx'
import Home from './components/home.jsx'
import NotFound from './components/notFound.jsx'
import AccessDenied from './components/accessDenied.jsx'
import User from './components/user.jsx'
import Cart from './components/cart.jsx'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      format: 'loading',
      user: {},
      dropdown: {
        register: {open: false, username: '', password: ''},
        login: {open: false, username: '', password: ''},
        settings: {open: false}
      },
      listing: {},
      newListing: {title: '', by: [''], tag: [''], price: ''},
      profile: {},
      input: '',
      categories: [],
      listings: []
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
    let data = await fetch('/api/user', {credentials: 'include'})
    let json = await data.json()
    if (json.err) {
      console.log(json.err)
    } else if (json.res) {
      this.state.user = json.res
      this.setState(this.state)
    }
  }

  async loadMain (pathname, search='') {
    if (!pathname) {
      this.state.format = 'home'
    } else if (pathname.startsWith('search')) {
      let data = await fetch('/api/' + pathname + search)
      let json = await data.json()
      if (json.res) {
        this.state.listings = json.res.listings
        this.state.categories = json.res.categories
        this.state.input = json.res.input
        this.state.format = 'search'
      }
    } else if (pathname.startsWith('listing')) {
      let data = await fetch('/api/' + pathname)
      let json = await data.json()
      if (json.res) {
        Object.assign(this.state, json.res)
        this.state.format = 'listing'
      }
    } else if (pathname.startsWith('user')) {
      let data = await fetch('/api/' + pathname)
      let json = await data.json()
      if (json.err) {
        console.log(json.err)
      } else if (json.res) {
        this.state.profile = json.res
        this.state.format = 'user'
      }
    } else if (pathname === 'new') {
      this.state.format = 'new'
    } else if (pathname === 'cart') {
      let data = await fetch('/api/user/cart', {credentials: 'include'})
      let json = await data.json()
      if (json.res) this.state.cart = json.res
      else console.log(json.err)
      this.state.format = 'cart'
    }
    if (this.state.format === 'loading') this.state.format = '404'
    this.setState(this.state)
  }

  redirect (url) {
    this.state.format = 'loading'
    this.setState(this.state)
    window.history.pushState(null, null, url || '/')
    this.loadMain(...url.split(/(?=\?)/))
  }

  clickHandler (e) {
    let dropdown = this.state.dropdown
    function dd (cat, toggle) {
      let c = dropdown[cat]
      for (let p in c) {c[p] = p === 'open' ? toggle ? !c[p] : false : ''}
    }
    let login = document.getElementById('logincont')
    let register = document.getElementById('registercont')
    let settings = document.getElementById('settingscont')
    if (e.target.id === 'login') {
      dd('login', true)
      dd('register')
    } else if (e.target.id === 'register') {
      dd('login')
      dd('register', true)
    } else if (e.target.id === 'settings') {
      dd('settings', true)
    } else if (login && register && !login.contains(e.target) && !register.contains(e.target)) {
      dd('login')
      dd('register')
    } else if (settings && !settings.contains(e.target)) {
      dd('settings')
    }
    this.setState(this.state)
  }

  inputChange (e, field, i, cat) {
    if (!field) {
      this.state.input = e.target.value
    } else if (cat) {
      this.state.dropdown[cat][field] = e.target.value
    } else if (e) {
      if (typeof i !== 'undefined') this.state.newListing[field][i] = e.target.value
      else this.state.newListing[field] = e.target.value
    } else {
      if (i) this.state.newListing[field].splice(i, 1)
      else this.state.newListing[field].push('')
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
      this.state.input = ''
      this.redirect('')
    } else if (btn === 'login' || btn === 'register' || btn === 'logout') {
      let url = '/api/user/' + btn
      if (btn !== 'logout') url += '/' + this.state.dropdown[btn].username + '/' + this.state.dropdown[btn].password
      let data = await fetch(url, {method: 'post', credentials: 'include'})
      let json = await data.json()
      if (json.err) {
        console.log(json.err)
      } else if (json.res) {
        this.state.user = json.res
        for (let x in this.state.dropdown) {
          for (let y in this.state.dropdown[x]) {
            this.state.dropdown[x][y] = y === 'open' ? false : ''
          }
        }
        if (this.state.format === 'cart') this.loadMain('cart')
        else this.setState(this.state)
      }
    } else if (btn === 'search') {
      let input = this.state.input ? 'input=' + encodeURIComponent(this.state.input) : ''
      let filter = z && this.state.categories
        .map(cat => cat.values
          .filter(value => value.sel)
          .map(value => encodeURIComponent(cat.name) + '=' + encodeURIComponent(value.v))
        ).reduce((a, b) => a.concat(b), [])
        .join('&')
      let url = 'search?' + [input, filter].filter(x => x).join('&')
      this.redirect(url)
    } else if (btn === 'post') {
      let nl = this.state.newListing
      let print = (a, b) => encodeURIComponent(a) + '=' + encodeURIComponent(b)
      let query = Object.keys(nl)
        .map(k => {
          if (nl[k].constructor === Array) return nl[k].filter(x => x).map(v => print(k, v))
          else if (nl[k]) return print(k, nl[k])
        }).reduce((a, b) => a.concat(b), [])
        .filter(x => x)
        .join('&')
      let url = '/api/listing?' + query
      let data = await fetch(url, {method: 'post', credentials: 'include'})
      let json = await data.json()
      if (json.err) console.log(json.err)
      else if (json.res) this.redirect('listing/' + json.res._id)
    } else if (btn === 'new') {
      this.redirect('new')
    } else if (btn === 'cart') {
      this.redirect('cart')
    } else if (btn === 'remove') {
      console.log('remove/' + z)
    } else if (btn === 'listing') {
      this.redirect('listing/' + z)
    }
  }

  render () { return (
    <div>
      <Header user={this.state.user} dropdown={this.state.dropdown} inputChange={this.inputChange} clickBtn={this.clickBtn} />
      { this.state.format === 'loading'
      ? <Loading />
      : this.state.format === 'home'
      ? <div className='padded'>
          <Search input={this.state.input} inputChange={this.inputChange} clickBtn={this.clickBtn} />
          <Home />
        </div>
      : this.state.format === 'new'
        ? this.state.user.isLoggedIn
        ? <NewListing newListing={this.state.newListing} inputChange={this.inputChange} clickBtn={this.clickBtn} />
        : <AccessDenied />
      : this.state.format === 'search'
      ? <div className='padded'>
          <Search input={this.state.input} inputChange={this.inputChange} clickBtn={this.clickBtn} />
          <div className='flex'>
            <Filter categories={this.state.categories} clickFilter={this.clickFilter} clickBtn={this.clickBtn} />
            <Listings listings={this.state.listings} columns={['title', 'by', 'tag', 'seller', 'price']} clickBtn={this.clickBtn} />
          </div>
        </div>
      : this.state.format === 'listing'
      ? <Listing listing={this.state.listing} clickBtn={this.clickBtn} />
      : this.state.format === 'user'
      ? <User user={this.state.profile} />
      : this.state.format === 'cart'
        ? this.state.user.isLoggedIn
        ? <Cart listings={this.state.cart} clickBtn={this.clickBtn} />
        : <AccessDenied />
      : <NotFound />
      }
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
