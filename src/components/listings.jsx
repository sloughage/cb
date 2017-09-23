import React from 'react'

export default (props) =>
  props.listings.length === 0
  ? <div className='flex center'>{props.empty}</div>
  : <div className='stretch'>
      <div className='thead'>
        { props.columns.map((v, i) =>
          <div className={'tcell' + props.columns.length} key={i}>{v}</div>
        )}
        { props.cart &&
          <div className='cont1'></div>
        }
      </div>
      { props.listings.map((l, i) =>
        <div className='trow' key={i}>
          <div className='listing' onClick={() => props.clickBtn('listing', l.id)}>
            { props.columns.map((c, i) =>
              <div className={'tcell' + props.columns.length} key={i}>
                { l[c] instanceof Array
                ? l[c].map((v, i) => <p key={i}>{v}</p>)
                : <p>{l[c]}</p>
                }
              </div>
            )}
          </div>
          { props.cart &&
            <div className='cont1'>
              <div className='btn' onClick={() => props.clickBtn('remove', l.id)}>
                remove from cart
              </div>
            </div>
          }
        </div>
      )}
    </div>
