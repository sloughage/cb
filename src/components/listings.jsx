import React from 'react'
import Loading from './loading.jsx'

export default (props) =>
  <div className='listings'>
    { props.listings.length === 0
    ? <div>no results found</div>
    : <div>
        <div className='thead'>
          {props.columns.map((v, i) =>
            <div className='tcell' key={i}>{v}</div>
          )}
        </div>
        {props.listings.map((l, i) =>
          <a className='listing' href='#' key={i}>
            {props.columns.map((c, i) =>
              <div className='tcell' key={i}>
                { l[c].constructor === Array
                ? l[c].map((v, i) => <p key={i}>{v}</p>)
                : <p>{l[c]}</p>
                }
              </div>
            )}
          </a>
        )}
      </div>
    }
  </div>