import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/header.jsx'
import Filter from './components/filter.jsx'
import Listings from './components/listings.jsx'
import Search from './components/search.jsx'
import Loading from './components/loading.jsx'
import NewListing from './components/newListing.jsx'
import Home from './components/home.jsx'
import NotFound from './components/notFound.jsx'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      format: this.getFormat(),
      isLoading: true,
      user: {},
      dropdown: {
        register: {open: false, username: '', password: ''},
        login: {open: false, username: '', password: ''},
        settings: {open: false}
      },
      listing: {},
      newListing: {title: '', by: [''], tag: [''], price: ''},
      input: '',
      categories: [],
      listings: [],
      columns: ['title', 'by', 'tag', 'seller', 'price']
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.inputChangeHeader = this.inputChangeHeader.bind(this)
    this.clickHeader = this.clickHeader.bind(this)
    this.inputChangeNew = this.inputChangeNew.bind(this)
    this.clickPost = this.clickPost.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.inputChangeSearch = this.inputChangeSearch.bind(this)
    this.clickFilter = this.clickFilter.bind(this)
  }

  getFormat () {
    let list = ['search', 'listing', 'user', 'new']
    let pathname = window.location.pathname.slice(1)
    let path = pathname.split(/[/?]+/)[0]
    if (list.includes(path)) return path
    else if (!path) return 'home'
    else return '404'
  }

  dropdown (cat, toggle) {
    let c = this.state.dropdown[cat]
    for (let p in c) {c[p] = (p === 'open' ? (toggle ? !c[p] : false) : '')}
  }

  async componentDidMount () {
    this.fetchUser()
    this.fetchMain()
    document.addEventListener('mousedown', this.clickHandler)
  }

  async fetchUser () {
    let data = await fetch('/api/user', {credentials: 'include'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.setState(this.state)
    }
  }

  async fetchMain () {
    let list = ['home', '404', 'new']
    let pathname = window.location.pathname.slice(1)
    if (!list.includes(this.state.format)) {
      let data = await fetch('/api/' + pathname)
      let json = await data.json()
      if (json.res) Object.assign(this.state, json.res)
    }
    this.state.isLoading = false
    this.setState(this.state)
  }

  clickHandler (e) {
    let login = document.getElementById('logincont')
    let register = document.getElementById('registercont')
    let settings = document.getElementById('settingscont')
    if (e.target.id === 'logindd') {
      this.dropdown('login', true)
      this.dropdown('register')
    } else if (e.target.id === 'registerdd') {
      this.dropdown('login')
      this.dropdown('register', true)
    } else if (e.target.id === 'settingsdd') {
      this.dropdown('settings', true)
    } else if (login && register && !login.contains(e.target) && !register.contains(e.target)) {
      this.dropdown('login')
      this.dropdown('register')
    } else if (settings && !settings.contains(e.target)) {
      this.dropdown('settings')
    }
    this.setState(this.state)
  }

  inputChangeHeader (e, cat, field) {
    this.state.dropdown[cat][field] = e.target.value
    this.setState(this.state)
  }

  async clickHeader (btn) {
    let uri = '/api/user/' + btn
    uri += btn !== 'logout' ? '/' + this.state.dropdown[btn].username + '/' + this.state.dropdown[btn].password : ''
    let data = await fetch(uri, {method: 'post', credentials: 'include'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.dropdown('login')
      this.dropdown('register')
      this.dropdown('settings')
      this.setState(this.state)
    }
  }

  inputChangeNew (e, field, i) {
    if (e) {
      if (typeof i !== 'undefined') this.state.newListing[field][i] = e.target.value
      else this.state.newListing[field] = e.target.value
    } else {
      if (i) this.state.newListing[field].splice(i, 1)
      else this.state.newListing[field].push('')
    }
    this.setState(this.state)
  }

  async clickPost () {
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
    console.log(json.message)
  }

  inputChangeSearch (e) {
    this.state.input = e.target.value
    this.setState(this.state)
  }

  async clickSearch (f) {
    this.state.isLoading = true
    this.setState(this.state)
    let input = this.state.input ? 'input=' + encodeURIComponent(this.state.input) : ''
    let filter = this.state.categories
      .map(cat => cat.values
        .filter(value => value.sel)
        .map(value => encodeURIComponent(cat.name) + '=' + encodeURIComponent(value.v))
      ).reduce((a, b) => a.concat(b), [])
      .join('&')
    let url = '/api/search?' + input + (input && filter && f ? '&' : '') + (f ? filter : '')
    let data = await fetch(url)
    let json = await data.json()
    if (json.res) {
      Object.assign(this.state, json.res)
      this.state.isLoading = false
      this.setState(this.state)
    }
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

  render () { return (
    <div>
      <Header user={this.state.user} dropdown={this.state.dropdown} inputChange={this.inputChangeHeader} clickHeader={this.clickHeader} />
      { this.state.isLoading
      ? <Loading />
      : this.state.format === 'home'
      ? <div className='padded'>
          <Search input={this.state.input} inputChange={this.inputChangeSearch} clickSearch={this.clickSearch} />
          <Home />
        </div>
      : this.state.format === 'new'
      ? <NewListing newListing={this.state.newListing} inputChange={this.inputChangeNew} clickPost={this.clickPost} />
      : this.state.format === 'search'
      ? <div className='padded'>
          <Search input={this.state.input} inputChange={this.inputChangeSearch} clickSearch={this.clickSearch} />
          <div className='flex'>
            <Filter categories={this.state.categories} clickFilter={this.clickFilter} clickSearch={this.clickSearch} />
            <Listings listings={this.state.listings} columns={this.state.columns} />
          </div>
        </div>
      : <NotFound />
      }
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
