import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/header.jsx'
import Filter from './components/filter.jsx'
import Listings from './components/listings.jsx'
import Search from './components/search.jsx'
import Loading from './components/loading.jsx'
import NewListing from './components/newListing.jsx'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      format: '',
      isLoading: true,
      user: {},
      categories: [],
      listings: [],
      input: '',
      columns: ['title', 'by', 'tag', 'seller', 'price'],
      dd: {
        register: {open: false, username: '', password: ''},
        login: {open: false, username: '', password: ''},
        settings: {open: false}
      },
      newListing: {
        title: '',
        by: [''],
        tag: [''],
        price: ''
      }
    }
    this.inputChangeHeader = this.inputChangeHeader.bind(this)
    this.inputChangeNew = this.inputChangeNew.bind(this)
    this.inputChangeSearch = this.inputChangeSearch.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.clickHeader = this.clickHeader.bind(this)
    this.clickPost = this.clickPost.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.clickFilter = this.clickFilter.bind(this)
  }

  async componentDidMount () {
    await this.fetchUser()
    await this.fetchMain()
    document.addEventListener('mousedown', this.clickHandler)
  }

  async fetchUser () {
    let data = await fetch('/api/user')
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.setState(this.state)
    }
  }

  async fetchMain () {
    let pathname = window.location.pathname.slice(1)
    if (!pathname) {
      this.state.format = 'landing'
    }
    let data = await fetch('/api/search')
    let json = await data.json()
    if (json.res) {
      Object.assign(this.state, json.res)
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

  clickPost () {
    let nl = this.state.newListing
    let print = (a, b) => encodeURIComponent(a) + '=' + encodeURIComponent(b)
    let data = Object.keys(nl)
      .map(k => {
        if (nl[k].constructor === Array) return nl[k].filter(v => v).map(v => print(k, v))
        else if (nl[k]) return print(k, nl[k])
      }).reduce((a, b) => a.concat(b), [])
      .filter(x => x)
      .join('&')
    let uri = '/api/listing?' + data
    console.log(uri)
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
    let uri = '/api/search?' + input + (input && filter && f ? '&' : '') + (f ? filter : '')
    let data = await fetch(uri)
    let json = await data.json()
    if (json.res) {
      Object.assign(this.state, json.res)
      this.setState(this.state)
    }
  }

  dd (cat, toggle) {
    let c = this.state.dd[cat]
    for (let p in c) {c[p] = (p === 'open' ? (toggle ? !c[p] : false) : '')}
  }

  inputChangeHeader (e, cat, field) {
    this.state.dd[cat][field] = e.target.value
    this.setState(this.state)
  }

  async clickHeader (btn) {
    let uri = '/api/user/'
    let dd = this.state.dd
    if (btn === 'login') uri += 'login/' + dd.login.username + '/' + dd.login.password
    else if (btn === 'logout') uri += 'logout'
    else if (btn === 'register') uri += 'register/' + dd.register.username + '/' + dd.register.password
    let data = await fetch(uri, {method: 'post'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.dd('login')
      this.dd('register')
      this.dd('settings')
      this.setState(this.state)
    }
  }

  clickHandler (e) {
    let login = document.getElementById('logincont')
    let register = document.getElementById('registercont')
    let settings = document.getElementById('settingscont')
    if (e.target.id === 'logindd') {
      this.dd('login', true)
      this.dd('register')
    } else if (e.target.id === 'registerdd') {
      this.dd('login')
      this.dd('register', true)
    } else if (e.target.id === 'settingsdd') {
      this.dd('settings', true)
    } else if (login && register && !login.contains(e.target) && !register.contains(e.target)) {
      this.dd('login')
      this.dd('register')
    } else if (settings && !settings.contains(e.target)) {
      this.dd('settings')
    }
    this.setState(this.state)
  }

  render () { return (
    <div>
      <Header
        user={this.state.user}
        dd={this.state.dd}
        inputChange={this.inputChangeHeader}
        clickHeader={this.clickHeader} />
      <div className='flex body'>
        <Filter
          categories={this.state.categories}
          clickVal={this.clickVal}
          clickCat={this.clickCat}
          clickFilter={this.clickFilter}
          clickSearch={this.clickSearch} />
        <div className='stretch block'>
          <Search
            input={this.input}
            inputChange={this.inputChangeSearch}
            clickSearch={this.clickSearch} />
          { this.state.isLoading
          ? <Loading />
          : <Listings
              listings={this.state.listings}
              columns={this.state.columns} />
          }
        </div>
      </div>
      <NewListing
        newListing={this.state.newListing}
        inputChange={this.inputChangeNew}
        clickPost={this.clickPost} />
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
