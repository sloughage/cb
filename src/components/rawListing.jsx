import React from 'react'
import AccessDenied from './accessDenied.jsx'

export default (props) =>
  <div>
    <div>
      <input
        type='text'
        value={props.rawListing.title}
        placeholder='title'
        onChange={(e) => props.inputChange(e, 'title')} />
    </div>
    { props.rawListing.by.map((x, i) =>
      <div key={i} className='flex'>
        <input
          type='text'
          value={x}
          placeholder='by'
          onChange={(e) => props.inputChange(e, 'by', i)} />
        <div>
          <div className='btn' onClick={() => props.inputChange(false, 'by', i)}>
            {i === 0 ? '+' : '-'}
          </div>
        </div>
      </div>
    )}
    { props.rawListing.tag.map((x, i) =>
      <div key={i} className='flex'>
        <input
          type='text'
          value={x}
          placeholder='tag'
          onChange={(e) => props.inputChange(e, 'tag', i)} />
        <div>
          <div className='btn' onClick={() => props.inputChange(false, 'tag', i)}>
            {i === 0 ? '+' : '-'}
          </div>
        </div>
      </div>
    )}
    <div>
      <input
        type='text'
        value={props.rawListing.price}
        placeholder='price'
        onChange={(e) => props.inputChange(e, 'price')}/>
    </div>
    <div className='flex'>
      <div className='btn' onClick={() => props.clickBtn(props.btn)}>
        {props.btn}
      </div>
    </div>
    { props.btn === 'save' &&
      <div className='flex'>
        <div className='btn' onClick={() => props.clickBtn('delete')}>
          delete
        </div>
      </div>
    }
  </div>
