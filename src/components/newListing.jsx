import React from 'react'
import AccessDenied from './accessDenied.jsx'
import RawListing from './rawListing.jsx'

export default (props) =>
  props.isLoggedIn
  ? <RawListing
      rawListing={props.rawListing}
      inputChange={props.inputChange}
      clickBtn={props.clickBtn}
      btn='post' />
  : <AccessDenied />
