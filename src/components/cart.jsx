import React from 'react'
import Listings from './listings.jsx'
import AccessDenied from './accessDenied.jsx'

export default (props) =>
  props.isLoggedIn
  ? <div className='p2'>
      <div className='title'>your cart</div>
      <Listings
        cart={true}
        empty='empty'
        listings={props.listings}
        columns={['title', 'by', 'tag', 'seller', 'price']}
        clickBtn={props.clickBtn} />
    </div>
  : <AccessDenied />
