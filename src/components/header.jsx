import React from 'react'
import Loading from './loading.jsx'

export default (props) =>
  <div className='header'>
    <a href='#'><div className='logo'></div></a>
    {Object.keys(props.user).length === 0
    ? <div></div>
    : props.user.isLoggedIn
      ? <div className='flex'>
          <a className='btn link' href='#'>cart{props.user.cartcount === 0 ? '' : '(' + props.user.cartcount + ')'}</a>
          <div>
            <div className='btn' id='settingsdd'>{props.user.username}</div>
            <div className={props.dropdown.settings ? 'dropdown' : 'hidden'} id='settingscont'>
              <div className='btn'>logout</div>
            </div>
          </div>
        </div>
      : <div className='flex'>
          <div>
            <div className='btn' id='registerdd'>register</div>
            <div className={props.dropdown.register ? 'dropdown box' : 'hidden'} id='registercont'>
              <input type='text' />
              <div className='spacev1'></div>
              <input type='text' />
              <div className='spacev2'></div>
              <div className='btncont'>
                <div className='btn'>register</div>
              </div>
            </div>
          </div>
          <div>
            <div className='btn' id='logindd'>login</div>
            <div className={props.dropdown.login ? 'dropdown box' : 'hidden'} id='logincont'>
              <input type='text' placeholder='username' />
              <div className='spacev1'></div>
              <input type='text' placeholder='password' />
              <div className='spacev2'></div>
              <div className='btncont'>
                <div className='btn'>login</div>
              </div>
            </div>
          </div>
        </div>
    }
  </div>