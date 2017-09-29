import React from 'react'
import Listings from './listings.jsx'

export default (props) =>
  <div className='p2'>
    <div className='title'>{props.user.username}</div>
    <Listings
      empty='no listings'
      listings={props.user.listings}
      columns={['title', 'by', 'tag', 'price']}
      clickBtn={props.clickBtn} />
  </div>
