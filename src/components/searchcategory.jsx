import React from 'react'

export default function (props) {
  let values = props.values.map((value, i) =>
    <div key={i}>{value.v}</div>
  )
  return (
    <div>
      <div>{props.name}</div>
      {values}
    </div>
  )
}