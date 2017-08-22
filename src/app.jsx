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
      columns: [],
      input: '',
      dropdown: {}
    }
    this.inputChange = this.inputChange.bind(this)
    this.clickVal = this.clickVal.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  async componentDidMount () {
    let data = await fetch('/api/search/load')
    let json = await data.json()
    this.setState(json.res)
    document.addEventListener('mousedown', this.clickHandler)
  }

  clickVal (i, j) {
    let value = this.state.categories[i].values[j]
    value.sel = !value.sel
    this.setState(this.state)
  }

  inputChange (e) {
    this.state.input = e.target.value
    this.setState(this.state)
  }

  getString () {
    return this.state.categories
      .map(cat => cat.values
        .filter(value => value.sel)
        .map(value => encodeURIComponent(cat.name) + '=' + encodeURIComponent(value.v))
      )
      .reduce((a, b) => a.concat(b), [])
      .join('&')
  }

  clickSearch () {
    console.log(this.getString())
  }

  clickLogin () {
    console.log('login')
  }

  clickRegister () {
    console.log('register')
  }

  clickHandler (e) {
    let logincont = document.getElementById('logincont')
    let registercont = document.getElementById('registercont')
    if (e.target.id === 'logindd') {
      this.state.dropdown.login = !this.state.dropdown.login
      this.state.dropdown.register = false
    } else if (e.target.id === 'registerdd') {
      this.state.dropdown.login = false
      this.state.dropdown.register = !this.state.dropdown.register
    } else if (!logincont.contains(e.target) && !registercont.contains(e.target)) {
      this.state.dropdown.login = false
      this.state.dropdown.register = false
    }
    this.setState(this.state)
  }

  render () { return (
    <div>
      <Header
        isLoading={this.state.isLoading}
        user={this.state.user}
        dropdown={this.state.dropdown} />
      {this.state.isLoading
        ? <Loading />
        : <div className='flex body'>
            <Search
              isLoading={this.state.isLoading}
              categories={this.state.categories}
              input={this.state.input}
              inputChange={this.inputChange}
              clickVal={this.clickVal}
              clickSearch={this.clickSearch} />
            <Listings
              isLoading={this.state.isLoading}
              listings={this.state.listings}
              columns={this.state.columns} />
          </div>
      }
    </div>
  )}
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
