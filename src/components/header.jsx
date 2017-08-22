import React from 'react'
import Loading from './loading.jsx'

export default (props) =>
  <div className='header'>
    <a href='#'><div className='logo'></div></a>
    {props.isLoading
    ? <div></div>
    : props.user.isLoggedIn
      ? <div className='flex'>
          <div className='btn'>cart ()</div>
          <div className='btn'>{props.user.username}</div>
        </div>
      : <div className='flex'>
          <div>
            <div className='btn' id='registerdd'>register</div>
            <div className={props.dropdown.register ? 'dropdown' : 'dropdown hidden'} id='registercont'>
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
            <div className={props.dropdown.login ? 'dropdown' : 'dropdown hidden'} id='logincont'>
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