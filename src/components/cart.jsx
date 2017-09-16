import React from 'react'
import Listings from './listings.jsx'
import AccessDenied from './accessDenied.jsx'

export default (props) =>
  props.isLoggedIn
  ? <div>
      <div>cart</div>
      <Listings
        listings={props.listings}
        columns={['title', 'by', 'tag', 'seller', 'price']}
        clickBtn={props.clickBtn}
        cart={true} />
    </div>
  : <AccessDenied />
