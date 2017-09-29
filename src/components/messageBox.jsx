import React from 'react'

export default (props) =>
  props.message &&
  <div className={'message ' + props.message.type}>
    {props.message.text}
  </div>
