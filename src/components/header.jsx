import React from 'react'

export default (props) =>
  <div className='header'>
    <div className='logo' onClick={() => props.clickBtn('home')}></div>
    { Object.keys(props.user).length === 0
    ? <div></div>
    : props.user.isLoggedIn
      ? <div className='flex'>
          <div className='btn' onClick={() => props.clickBtn('new')}>new</div>
          <div className='btn' onClick={() => props.clickBtn('cart')}>cart</div>
          <div>
            <div className='btn' id='settings'>{props.user.username}</div>
            <div className={props.dropdown.settings.open ? 'dropdown' : 'hidden'} id='settingscont'>
              <div className='btn' onClick={() => props.clickBtn('logout')}>logout</div>
            </div>
          </div>
        </div>
      : <div className='flex'>
          <div>
            <div className='btn' id='register'>register</div>
            <div className={props.dropdown.register.open ? 'dropdown box' : 'hidden'} id='registercont'>
              <input type='text' value={props.dropdown.register.username} placeholder='username' onChange={(e) => props.inputChange(e, 'username', null, 'register')} />
              <input type='text' value={props.dropdown.register.password} placeholder='password' onChange={(e) => props.inputChange(e, 'password', null, 'register')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickBtn('register')}>register</div></div>
            </div>
          </div>
          <div>
            <div className='btn' id='login'>login</div>
            <div className={props.dropdown.login.open ? 'dropdown box' : 'hidden'} id='logincont'>
              <input type='text' value={props.dropdown.login.username} placeholder='username' onChange={(e) => props.inputChange(e, 'username', null, 'login')} />
              <input type='text' value={props.dropdown.login.password} placeholder='password' onChange={(e) => props.inputChange(e, 'password', null, 'login')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickBtn('login')}>login</div></div>
            </div>
          </div>
        </div>
    }
  </div>
