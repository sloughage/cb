import React from 'react'

export default (props) =>
  <div>
    <div><input type='text' value={props.newListing.title} placeholder='title' onChange={(e) => props.inputChange(e, 'title')} /></div>
    { props.newListing.by.map((x, i) =>
      <div key={i} className='flex'>
        <input type='text' value={x} placeholder='by' onChange={(e) => props.inputChange(e, 'by', i)} />
        <div><div className='btn' onClick={() => props.inputChange(false, 'by', i)}>{i === 0 ? '+' : '-'}</div></div>
      </div>
    )}
    { props.newListing.tag.map((x, i) =>
      <div key={i} className='flex'>
        <input type='text' value={x} placeholder='tag' onChange={(e) => props.inputChange(e, 'tag', i)} />
        <div><div className='btn' onClick={() => props.inputChange(false, 'tag', i)}>{i === 0 ? '+' : '-'}</div></div>
      </div>
    )}
    <div><input type='text' value={props.newListing.price} placeholder='price ($)' onChange={(e) => props.inputChange(e, 'price')}/></div>
    <div className='flex'><div className='btn' onClick={() => props.clickBtn('post')}>post</div></div>
  </div>
