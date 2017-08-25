import React from 'react'

export default (props) =>
  <div className='header'>
    <a href='#'><div className='logo'></div></a>
    { Object.keys(props.user).length === 0
    ? <div></div>
    : props.user.isLoggedIn
      ? <div className='flex'>
          <a className='btn link' href='#'>new</a>
          <a className='btn link' href='#'>cart({props.user.cartcount === 0 ? 'empty' : props.user.cartcount})</a>
          <div>
            <div className='btn' id='settingsdd'>{props.user.username}</div>
            <div className={props.settings.open ? 'dropdown' : 'hidden'} id='settingscont'>
              <div className='btn' onClick={() => props.clickLogout()}>logout</div>
            </div>
          </div>
        </div>
      : <div className='flex'>
          <div>
            <div className='btn' id='registerdd'>register</div>
            <div className={props.register.open ? 'dropdown box' : 'hidden'} id='registercont'>
              <input type='text' value={props.register.username} placeholder='username' onChange={(e) => props.inputChange(e, 'register', 'username')} />
              <input type='text' value={props.register.password} placeholder='password' onChange={(e) => props.inputChange(e, 'register', 'password')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickRegister()}>register</div></div>
            </div>
          </div>
          <div>
            <div className='btn' id='logindd'>login</div>
            <div className={props.login.open ? 'dropdown box' : 'hidden'} id='logincont'>
              <input type='text' value={props.login.username} placeholder='username' onChange={(e) => props.inputChange(e, 'login', 'username')} />
              <input type='text' value={props.login.password} placeholder='password' onChange={(e) => props.inputChange(e, 'login', 'password')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickLogin()}>login</div></div>
            </div>
          </div>
        </div>
    }
  </div>