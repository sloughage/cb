import React from 'react'

export default function (props) {
  return (
    <div className="square" onClick={props.onClick}>
      {props.value}
    </div>
  )
}