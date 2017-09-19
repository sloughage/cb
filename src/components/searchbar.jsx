import React from 'react'

export default (props) =>
  <div className='searchbar'>
    <input type='text' id='search' value={props.input} onChange={(e) => props.inputChange(e)} />
    <div className='btn' onClick={() => props.clickBtn('search')}>search</div>
  </div>
