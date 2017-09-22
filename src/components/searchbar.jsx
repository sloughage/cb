import React from 'react'

export default (props) =>
  <div className='searchbar'>
    <input
      type='text'
      className='search'
      value={props.input}
      onChange={(e) => props.inputChange(e)}
      placeholder='search'/>
    <div className='btn2' onClick={() => props.clickBtn('search')}>
      search
    </div>
  </div>
