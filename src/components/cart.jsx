import React from 'react'
import Listings from './listings.jsx'
import AccessDenied from './accessDenied.jsx'

export default (props) =>
  props.isLoggedIn
  ? <div>
      <div>cart</div>
      <Listings
        empty='empty'
        listings={props.listings}
        columns={['title', 'by', 'tag', 'seller', 'price']}
        clickBtn={props.clickBtn} />
    </div>
  : <AccessDenied />
