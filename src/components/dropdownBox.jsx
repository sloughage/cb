import React from 'react'

export default (props) =>
  <div>
    <div className='btn' id={props.type}>{props.type}</div>
    <div className={props.data.open ? 'dropdown box' : 'hidden'} id={props.type + 'cont'}>
      <input type='text' value={props.data.username} placeholder='username' onChange={(e) => props.inputChange(e, 'username', null, props.type)} />
      <input type='text' value={props.data.password} placeholder='password' onChange={(e) => props.inputChange(e, 'password', null, props.type)} />
      <div className='flex'><div className='btn' onClick={() => props.clickBtn(props.type)}>{props.type}</div></div>
    </div>
  </div>
