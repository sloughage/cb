import React from 'react'

export default (props) =>
  <div>
    <p>sold by: {props.listing.username}</p>
    <p>{props.listing.title}</p>
    <p>{props.listing.by.join(', ')}</p>
    <p>{props.listing.tag.join(', ')}</p>
    <p>{props.listing.price}</p>
  </div>
