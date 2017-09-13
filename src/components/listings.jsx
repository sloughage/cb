import React from 'react'

export default (props) =>
  <div className='stretch'>
    { props.listings.length === 0
    ? <div>no results found</div>
    : <div>
        <div className='thead'>
          { props.columns.map((v, i) =>
            <div className='tcell' key={i}>{v}</div>
          )}
          { props.cart &&
            <div className='cont1'></div>
          }
        </div>
        { props.listings.map((l, i) =>
          <div className='trow' key={i}>
            <div className='listing' onClick={() => props.clickBtn('listing', l.id)}>
              { props.columns.map((c, i) =>
                <div className='tcell' key={i}>
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
    }
  </div>
