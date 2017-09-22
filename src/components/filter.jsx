import React from 'react'

export default (props) =>
  <div className='filter'>
    <div>
      { props.categories.map((cat, i) =>
        <div key={i}>
          <div className='flex stretch between pointer' onClick={() => props.clickFilter(i)}>
            <div>{cat.name}</div>
            <div>{cat.open ? 'v' : '<'}</div>
          </div>
          <div className={props.categories[i].open ? '' : 'hidden'}>
            { cat.values.map((value, j) =>
              <p key={j} onClick={() => props.clickFilter(i, j)} className={value.sel ? 'indent sel' : 'indent unsel'}>
                {value.v}
              </p>
            )}
          </div>
        </div>
      )}
      <div className='btncont'>
        <div className='btn2' onClick={() => props.clickBtn('search', true)}>filter</div>
      </div>
    </div>
  </div>
