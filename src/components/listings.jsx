import React from 'react'

export default (props) =>
  props.listings.length === 0
  ? <div className='flex center'>{props.empty}</div>
  : <div id='listings' className='stretch'>
      <div className='flex stretch bb'>
        { props.columns.map((v, i) =>
          <div className={'cell' + props.columns.length} key={i}>{v}</div>
        )}
        { props.cart &&
          <div className='cont'></div>
        }
      </div>
      { props.listings.map((l, i) =>
        <div className='stretch flex' key={i}>
          <div className='listing' onClick={() => props.clickBtn('listing', l.id)}>
            { props.columns.map((c, i) =>
              <div className={'cell' + props.columns.length} key={i}>
                { l[c] instanceof Array
                ? l[c].map((v, i) => <p key={i}>{v}</p>)
                : <p>{c === 'price' ? '$' + l[c].toFixed(2) : l[c]}</p>
                }
              </div>
            )}
          </div>
          { props.cart &&
            <div className='cont'>
              <div className='btn' onClick={() => props.clickBtn('remove', l.id)}>
                remove from cart
              </div>
            </div>
          }
        </div>
      )}
    </div>
