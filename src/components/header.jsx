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
            <div className={props.dd.settings.open ? 'dropdown' : 'hidden'} id='settingscont'>
              <div className='btn' onClick={() => props.clickHeader('logout')}>logout</div>
            </div>
          </div>
        </div>
      : <div className='flex'>
          <div>
            <div className='btn' id='registerdd'>register</div>
            <div className={props.dd.register.open ? 'dropdown box' : 'hidden'} id='registercont'>
              <input type='text' value={props.dd.register.username} placeholder='username' onChange={(e) => props.inputChange(e, 'register', 'username')} />
              <input type='text' value={props.dd.register.password} placeholder='password' onChange={(e) => props.inputChange(e, 'register', 'password')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickHeader('register')}>register</div></div>
            </div>
          </div>
          <div>
            <div className='btn' id='logindd'>login</div>
            <div className={props.dd.login.open ? 'dropdown box' : 'hidden'} id='logincont'>
              <input type='text' value={props.dd.login.username} placeholder='username' onChange={(e) => props.inputChange(e, 'login', 'username')} />
              <input type='text' value={props.dd.login.password} placeholder='password' onChange={(e) => props.inputChange(e, 'login', 'password')} />
              <div className='btncont'><div className='btn' onClick={() => props.clickHeader('login')}>login</div></div>
            </div>
          </div>
        </div>
    }
  </div>