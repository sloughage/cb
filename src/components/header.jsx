import React from 'react'

export default (props) =>
  <div className='header'>
    <a href='#'><div className='logo'></div></a>
    {props.user.isLoggedIn
      ? <div className='flex'>
          <div className='hbtn'>cart</div>
          <div className='hbtn'>{props.user.username}</div>
        </div>
      : <div className='flex'>
          <div>
            <div className='hbtn' onClick={() => props.clickDropdown('register')}>register</div>
            <div className={props.dropdown.register ? 'dropdown' : 'dropdown hidden'}>
              <input type='text' />
              <input type='text' />
            </div>
          </div>
          <div>
            <div className='hbtn' onClick={() => props.clickDropdown('login')}>login</div>
            <div className={props.dropdown.login ? 'dropdown' : 'dropdown hidden'}>
              <input type='text' placeholder='username' />
              <input type='text' placeholder='password' />
            </div>
          </div>
        </div>
    }
  </div>