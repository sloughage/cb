import React from 'react'

export default (props) =>
  props.message &&
  <div className={props.message.type}>{props.message.text}</div>
