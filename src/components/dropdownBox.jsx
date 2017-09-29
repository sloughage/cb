import React from 'react'

export default (props) =>
  <div>
    <div className='btn' id={props.type}>
      {props.type}
    </div>
    <div className={props.data.open ? 'dropdown p2' : 'hidden'} id={props.type + 'cont'}>
      <div>username</div>
      <input
        type='text'
        value={props.data.username}
        onChange={(e) => props.inputChange(e, 'username', null, props.type)} />
      <div>password</div>
      <input
        type='text'
        value={props.data.password}
        onChange={(e) => props.inputChange(e, 'password', null, props.type)} />
      <div className='flex stretch center'>
        <div className='btn' onClick={() => props.clickBtn(props.type)}>
          {props.type}
        </div>
      </div>
    </div>
  </div>
