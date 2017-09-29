import React from 'react'
import RawListing from './rawListing.jsx'

export default (props) =>
  props.listing.edit &&
  props.user.isLoggedIn &&
  props.listing.userid === props.user.id
  ? <div className='p2'>
      <div className='title'>edit</div>
      <RawListing
        rawListing={props.rawListing}
        inputChange={props.inputChange}
        clickBtn={props.clickBtn}
        btn='save' />
    </div>
  : <div className='p2'>
      <p className='mb1'>{props.listing.title}</p>
      <p className='mb1'>by: {props.listing.by.join(', ')}</p>
      { props.listing.tag.length > 0 &&
        <p className='mb1'>
          tag: {props.listing.tag.join(', ')}
        </p>
      }
      <p className='mb1'>${props.listing.price.toFixed(2)}</p>
      <p className='mb1'>
        {'sold by: '}
        <span className='link' onClick={() => props.clickBtn('user', props.listing.userid)}>
          {props.listing.seller}
        </span>
      </p>
      { props.user.isLoggedIn &&
      ( props.listing.userid === props.user.id
      ? <div className='flex'>
          <div className='btn2' onClick={() => props.clickBtn('edit')}>
            edit
          </div>
        </div>
      : props.user.cart.includes(props.listing.id)
      ? <div className='flex'>
          <div className='btn2' onClick={() => props.clickBtn('remove', props.listing.id)}>
            remove from cart
          </div>
        </div>
      : <div className='flex'>
          <div className='btn2' onClick={() => props.clickBtn('add')}>
            add to cart
          </div>
        </div>
      )}
    </div>
