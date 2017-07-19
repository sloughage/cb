import React from 'react'
import Searchcategory from './searchcategory.jsx'

let categories = [
  {
    name: 'title',
    values: [
      {v: 'watchmen', sel: false},
      {v: 'pim & francie', sel: false},
      {v: 'big numbers #2', sel: false}
    ]
  },
  {
    name: 'by',
    values: [
      {v: 'alan moore', sel: false},
      {v: 'dave gibbons', sel: false},
      {v: 'al columbia', sel: false}
    ]
  },
  {
    name: 'tag',
    values: [
      {v: 'oop', sel: false}
    ]
  }
]

export default class Searchblock extends React.Component {
  constructor () {
    super()
    this.state = {
      searchinput: "",
      categories: categories
    }
  }

  clickCatVal (name) {
    // this.state.categories.find(cat => cat.name === name).
    console.log(name)
  }

  render () {
    let cats = this.state.categories.map((cat, i) =>
      <Searchcategory
        name={cat.name}
        values={cat.values}
        clickVal={() => this.clickCatVal(cat.name)}
        key={i}
      />
    )
    return (
      <div>
        {cats}
      </div>
    )
  }
}