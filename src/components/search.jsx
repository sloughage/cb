import React from 'react'

export default (props) =>
  <div className='searchblock'>
    <input type='text' id='search' value={props.input} onChange={(e) => props.inputChange(e)} />
    <div className='btn' onClick={() => props.clickSearch()}>search</div>
  </div>
