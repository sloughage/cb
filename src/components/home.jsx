import React from 'react'
import Searchbar from './searchbar.jsx'

export default (props) =>
  <div className='padded'>
    <Searchbar
      input={props.input}
      inputChange={props.inputChange}
      clickBtn={props.clickBtn} />
    <p>welcome to comics bazaar</p>
  </div>
