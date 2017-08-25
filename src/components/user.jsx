import React from 'react'
import Listings from './listings.jsx'

export default (props) =>
  <div>
    <p>{props.user.username}</p>
    <Listings listings={props.listings} columns={props.columns} />
  </div>