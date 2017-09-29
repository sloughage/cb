import React from 'react'

export default (props) =>
  <div id='filter' className='mr3'>
    { props.categories.map((cat, i) =>
      <div key={i} className='mt1'>
        { cat.values.length > 0
        ? <div className='flex stretch between pointer' onClick={() => props.clickFilter(i)}>
            <div className='w'>{cat.name}</div>
            <div className='btn3'>{cat.open ? 'v' : '<'}</div>
          </div>
        : <div className='flex stretch pointer'>
            <div className='disabled w'>{cat.name}</div>
          </div>
        }
        <div className={props.categories[i].open ? '' : 'collapsed'}>
          { cat.values.map((value, j) =>
            <div className='flex pointer' key={j} onClick={() => props.clickFilter(i, j)}>
              <div className='btn3'>{value.sel && 'x'}</div>
              <div className='w'>{value.v}</div>
            </div>
          )}
        </div>
      </div>
    )}
    <div className='cont'>
      <div className='btn2' onClick={() => props.clickBtn('search', true)}>filter</div>
    </div>
  </div>
