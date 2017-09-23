import React from 'react'

export default (props) =>
  <div className='filter'>
    { props.categories.map((cat, i) =>
      <div key={i}>
        <div className='flex stretch between pointer' onClick={() => props.clickFilter(i)}>
          <div>{cat.name}</div>
          <div>{cat.open ? 'v' : '<'}</div>
        </div>
        <div className={props.categories[i].open ? '' : 'hidden'}>
          { cat.values.map((value, j) =>
            <div className='flex pointer' key={j} onClick={() => props.clickFilter(i, j)}>
              <div className='btn3'>
                {value.sel && 'x'}
              </div>
              <p className='nowrap'>
                {value.v}
              </p>
            </div>
          )}
        </div>
      </div>
    )}
    <div className='btncont'>
      <div className='btn2' onClick={() => props.clickBtn('search', true)}>filter</div>
    </div>
  </div>
