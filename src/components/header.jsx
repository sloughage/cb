import React from 'react'
import DropdownBox from './dropdownBox.jsx'

export default (props) =>
  <div className='header'>
    <div className='logo' onClick={() => props.clickBtn('home')}>
      ComicsBazaar
    </div>
    { Object.keys(props.user).length === 0
    ? <div></div>
    : props.user.isLoggedIn
    ? <div className='flex'>
        <div>
          <div className='btn' id='settings'>{props.user.username}</div>
          <div className={props.dropdown.settings.open ? 'dropdown' : 'hidden'} id='settingscont'>
            <div className='btn' onClick={() => props.clickBtn('new')}>
              new
            </div>
            <div className='btn' onClick={() => props.clickBtn('cart')}>
              cart{props.user.cart.length ? ' (' + props.user.cart.length + ')' : ''}
            </div>
            <div className='btn' onClick={() => props.clickBtn('logout')}>
              logout
            </div>
          </div>
        </div>
      </div>
    : <div className='flex'>
        <DropdownBox
          type='register'
          data={props.dropdown.register}
          inputChange={props.inputChange}
          clickBtn={props.clickBtn} />
        <DropdownBox
          type='login'
          data={props.dropdown.login}
          inputChange={props.inputChange}
          clickBtn={props.clickBtn} />
      </div>
    }
  </div>
