import React from 'react'
import RawListing from './rawListing.jsx'

export default (props) =>
  props.listing.edit &&
  props.user.isLoggedIn &&
  props.listing.userid === props.user.id
  ? <RawListing
      rawListing={props.rawListing}
      inputChange={props.inputChange}
      clickBtn={props.clickBtn}
      btn='save' />
  : <div>
      <p>sold by: {props.listing.seller}</p>
      <p>{props.listing.title}</p>
      <p>by: {props.listing.by.join(', ')}</p>
      {props.listing.tag && <p>tag: {props.listing.tag.join(', ')}</p>}
      <p>${props.listing.price}</p>
      { props.user.isLoggedIn &&
      ( props.listing.userid === props.user.id
      ? <div className='flex'><div className='btn' onClick={() => props.clickBtn('edit')}>edit</div></div>
      : <div className='flex'><div className='btn' onClick={() => props.clickBtn('add')}>add to cart</div></div>
      )}
    </div>
