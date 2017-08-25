import React from 'react'

export default (props) =>
  <div>
    <p>{props.listing.username}</p>
    <p>{props.listing.title}</p>
    <p>{props.listing.by.join(', ')}</p>
    <p>{props.listing.tag.join(', ')}</p>
    <p>{props.listing.price}</p>
    { if (props.user._id === props.listing.userid) <div className='btn'>edit</div>
      else if (props.user.isLoggedIn) <div className='btn'>add to cart</div>
    }
  </div>