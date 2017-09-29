import React from 'react'
import AccessDenied from './accessDenied.jsx'

export default (props) =>
  <div className='flex v'>
    <div className='wrap'>
      <div className='mb2'>
        <div className='mb1'>title</div>
        <div className='flex'>
          <input
            type='text'
            value={props.rawListing.title}
            onChange={(e) => props.inputChange(e, 'title')} />
          <div className='w3'></div>
        </div>
      </div>
      <div className='mb2'>
        <div className='mb1'>by</div>
        { props.rawListing.by.map((x, i) =>
          <div key={i} className='flex'>
            <input
              type='text'
              value={x}
              onChange={(e) => props.inputChange(e, 'by', i)} />
            { i > 0
            ? <div className='btn3' onClick={() => props.inputChange(false, 'by', i)}>
                <p>x</p>
              </div>
            : <div className='w3'></div>
            }
          </div>
        )}
        <div className='flex center'>
          <p className='btn3' onClick={() => props.inputChange(false, 'by')}>v</p>
          <div className='w3'></div>
        </div>
      </div>
      <div className='mb3'>
        <div className='mb1'>tag</div>
        { props.rawListing.tag.map((x, i) =>
          <div key={i} className='flex'>
            <input
              type='text'
              value={x}
              onChange={(e) => props.inputChange(e, 'tag', i)} />
            { i > 0
            ? <div className='btn3' onClick={() => props.inputChange(false, 'tag', i)}>
                <p>x</p>
              </div>
            : <div className='w3'></div>
            }
          </div>
        )}
        <div className='flex center'>
          <p className='btn3' onClick={() => props.inputChange(false, 'tag')}>v</p>
          <div className='w3'></div>
        </div>
      </div>
      <div className='mb3'>
        <div className='mb1'>price</div>
        <input
          type='text'
          value={props.rawListing.price}
          onChange={(e) => props.inputChange(e, 'price')}/>
      </div>
    </div>
    <div className='flex'>
      <div className='flex'>
        <div className='btn2' onClick={() => props.clickBtn(props.btn)}>
          {props.btn}
        </div>
      </div>
      { props.btn === 'save' &&
        <div className='flex'>
          <div className='btn2 ml4' onClick={() => props.clickBtn('delete')}>
            delete
          </div>
        </div>
      }
    </div>
  </div>
