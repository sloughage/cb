import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/header.jsx'
import Search from './components/search.jsx'
import Listings from './components/listings.jsx'
import Loading from './components/loading.jsx'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      user: {},
      categories: [],
      listings: [],
      input: '',
      columns: ['title', 'by', 'tag', 'price'],
      register: {open: false, username: '', password: ''},
      login: {open: false, username: '', password: ''},
      settings: {open: false}
    }
    this.inputChangeSearch = this.inputChangeSearch.bind(this)
    this.clickVal = this.clickVal.bind(this)
    this.clickCat = this.clickCat.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.clickLogout = this.clickLogout.bind(this)
    this.clickLogin = this.clickLogin.bind(this)
    this.clickRegister = this.clickRegister.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.inputChangeHeader = this.inputChangeHeader.bind(this)
  }

  async componentDidMount () {
    await this.fetchMain()
    await this.fetchUser()
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
    let data = await fetch('/api/search')
    let json = await data.json()
    if (json.res) {
      Object.assign(this.state, json.res)
      this.setState(this.state)
    }
  }

  clickVal (i, j) {
    let values = this.state.categories[i].values
    values[j].sel = !values[j].sel
    if (i === 0) values.forEach((x, k) => {if (k !== j) values[k].sel = false})
    this.setState(this.state)
  }

  clickCat (i) {
    let cat = this.state.categories[i]
    cat.open = !cat.open
    this.setState(this.state)
  }

  inputChangeSearch (e) {
    this.state.input = e.target.value
    this.setState(this.state)
  }

  getString () {
    return this.state.categories
      .map(cat => cat.values
        .filter(value => value.sel)
        .map(value => encodeURIComponent(cat.name) + '=' + encodeURIComponent(value.v))
      ).reduce((a, b) => a.concat(b), [])
      .join('&')
  }

  async clickSearch () {
    let uri = '/api/search?' + this.getString()
    this.state.isLoading = true
    this.setState(this.state)
    let data = await fetch(uri)
    let json = await data.json()
    if (json.res) {
      Object.assign(this.state, json.res)
      this.setState(this.state)
    }
  }

  async clickLogin () {
    let uri = '/api/user/login/' + this.state.login.username + '/' + this.state.login.password
    let data = await fetch(uri, {method: 'post'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.closeLogin()
      this.closeRegister()
      this.setState(this.state)
    }
  }

  inputChangeHeader (e, dd, field) {
    this.state[dd][field] = e.target.value
    this.setState(this.state)
  }

  async clickLogout () {
    let data = await fetch('/api/user/logout', {method: 'post'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.state.settings.open = false
      this.setState(this.state)
    }
  }

  async clickRegister () {
    let uri = '/api/user/register/' + this.state.register.username + '/' + this.state.register.password
    let data = await fetch(uri, {method: 'post'})
    let json = await data.json()
    if (json.res) {
      this.state.user = json.res
      this.closeRegister()
      this.closeLogin()
      this.setState(this.state)
    }
  }

  closeRegister () {
    this.state.register.username = ''
    this.state.register.password = ''
    this.state.register.open = false
  }

  closeLogin () {
    this.state.login.username = ''
    this.state.login.password = ''
    this.state.login.open = false
  }

  clickHandler (e) {
    let logincont = document.getElementById('logincont')
    let registercont = document.getElementById('registercont')
    let settingscont = document.getElementById('settingscont')
    if (e.target.id === 'logindd') {
      this.state.login.open = !this.state.login.open
      this.closeRegister()
    } else if (e.target.id === 'registerdd') {
      this.closeLogin()
      this.state.register.open = !this.state.register.open
    } else if (e.target.id === 'settingsdd') {
      this.state.settings.open = !this.state.settings.open
    } else if (logincont && registercont && !logincont.contains(e.target) && !registercont.contains(e.target)) {
      this.closeLogin()
      this.closeRegister()
    } else if (settingscont && !settingscont.contains(e.target)) {
      this.state.settings.open = false
    }
    this.setState(this.state)
  }

  render () { return (
    <div>
      <Header
        user={this.state.user}
        register={this.state.register}
        login={this.state.login}
        settings={this.state.settings}
        clickLogin={this.clickLogin}
        clickRegister={this.clickRegister}
        inputChange={this.inputChangeHeader}
        clickLogout={this.clickLogout} />
      <div className='flex body'>
        <Search
          categories={this.state.categories}
          input={this.state.input}
          inputChange={this.inputChangeSearch}
          clickVal={this.clickVal}
          clickCat={this.clickCat}
          clickSearch={this.clickSearch} />
        <Listings
          isLoading={this.state.isLoading}
          listings={this.state.listings}
          columns={this.state.columns} />
      </div>
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
