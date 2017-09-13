import React from 'react'

export default (props) =>
  <div className='filterblock'>
    <div>
      { props.categories.map((cat, i) =>
        <div key={i}>
          <p onClick={() => props.clickFilter(i)} className={cat.open ? 'unsel' : 'sel'}>{cat.name}</p>
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
        <div className='btn' onClick={() => props.clickBtn('search', true)}>filter</div>
      </div>
    </div>
  </div>