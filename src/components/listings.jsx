import React from 'react'

export default (props) =>
  <div className='listings'>
    <div className='thead'>
      {props.columns.map((v, i) =>
        <div className='tcell' key={i}>{v}</div>
      )}
    </div>
    {props.listings.map((l, i) =>
      <a className='listing' href='#' key={i}>
        {props.columns.map((c, i) =>
          <div className='tcell' key={i}>
            {l[c].constructor === String
              ? <p>{l[c]}</p>
              : l[c].map((v, i) => <p key={i}>{v}</p>)
            }
          </div>
        )}
      </a>
    )}
  </div>