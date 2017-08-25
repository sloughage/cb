import React from 'react'

export default (props) =>
  <div className='searchblock'>
    <div>
      <input type='text' value={props.input} onChange={(e) => props.inputChange(e)} />
      { props.categories.map((cat, i) =>
        <div key={i}>
          <p onClick={() => props.clickCat(i)} className={cat.open ? 'unsel' : 'sel'}>{cat.name}</p>
          <div className={props.categories[i].open ? 'indent' : 'hidden'}>
            { cat.values.map((value, j) =>
              <p key={j} onClick={() => props.clickVal(i, j)} className={value.sel ? 'sel' : 'unsel'}>{value.v}</p>
            )}
          </div>
        </div>
      )}
      <div className='btncont'>
        <div className='btn' onClick={() => props.clickSearch()}>search</div>
      </div>
    </div>
  </div>