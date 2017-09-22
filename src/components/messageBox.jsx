import React from 'react'

export default (props) =>
  props.message &&
  <div className={'flex center padded2 ' + props.message.type}>
    {props.message.text}
  </div>
