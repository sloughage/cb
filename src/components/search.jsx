import React from 'react'

export default (props) =>
  <div className='searchblock'>
    <input type='text' value={props.input} onChange={(e) => props.inputChange(e)} />
    {props.categories.map((cat, i) =>
      <div key={i}>
        <p>{cat.name}</p>
        {cat.values.map((value, j) =>
          <p key={j} onClick={() => props.clickVal(i, j)} className={value.sel ? 'sel' : 'unsel'}>
            {value.v}
          </p>
        )}
      </div>
    )}
    <div className='button' onClick={() => props.clickSearch()}>Search</div>
  </div>