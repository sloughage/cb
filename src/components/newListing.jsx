import React from 'react'
import AccessDenied from './accessDenied.jsx'
import RawListing from './rawListing.jsx'

export default (props) =>
  props.isLoggedIn
  ? <div className='p2'>
      <div className='title'>new listing</div>
      <RawListing
        rawListing={props.rawListing}
        inputChange={props.inputChange}
        clickBtn={props.clickBtn}
        btn='post' />
    </div>
  : <AccessDenied />
