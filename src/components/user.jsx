import React from 'react'
import Listings from './listings.jsx'

export default (props) =>
  <div>
    <p>{props.user.username}</p>
    <Listings
      empty='no listings'
      listings={props.user.listings}
      columns={['title', 'by', 'tag', 'price']}
      clickBtn={props.clickBtn} />
  </div>
