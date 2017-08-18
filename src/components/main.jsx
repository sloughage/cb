import React from 'react'
import Header from './header.jsx'
import Search from './search.jsx'
import Listings from './listings.jsx'
import Loading from './loading.jsx'

export default class Main extends React.Component {
  constructor (props) {
    super()
    this.state = props.props
    this.inputChange = this.inputChange.bind(this)
    this.clickVal = this.clickVal.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.clickDropdown = this.clickDropdown.bind(this)
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

  clickDropdown (btn) {
    let dd = this.state.dropdown
    dd[btn] = !dd[btn]
    this.setState(this.state)
  }

  render () { return (
    <div>
      <Header user={this.state.user} dropdown={this.state.dropdown} clickDropdown={this.clickDropdown} />
      <div className='flex body'>
        <Search categories={this.state.categories} input={this.state.input} inputChange={this.inputChange} clickVal={this.clickVal} clickSearch={this.clickSearch} />
        <Listings listings={this.state.listings} columns={this.state.columns} />
      </div>
    </div>
  )}
}