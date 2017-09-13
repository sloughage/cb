import React from 'react'
import Listings from './listings.jsx'

export default (props) =>
  <div>
    <div>cart</div>
    <Listings
      listings={props.listings}
      columns={['title', 'by', 'tag', 'seller', 'price']}
      clickBtn={props.clickBtn}
      cart={true} />
  </div>